<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Aspect;

/**
 * This file is part of the Flowpack.Neos.Debug package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Doctrine\ORM\EntityManagerInterface;
use Flowpack\Neos\Debug\DataCollector\CacheAccessCollector;
use Flowpack\Neos\Debug\DataCollector\MessagesCollector;
use Flowpack\Neos\Debug\Domain\Model\Dto\ResourceStreamRequest;
use Flowpack\Neos\Debug\Logging\DebugStack;
use Flowpack\Neos\Debug\Service\DebugService;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Utils;
use Neos\ContentRepository\Domain\Service\ContextFactoryInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\ResourceManagement\PersistentResource;
use Neos\Media\Domain\Model\AssetInterface;
use Neos\Utility\ObjectAccess;

#[Flow\Scope('singleton')]
#[Flow\Aspect]
class CollectDebugInformationAspect
{
    #[Flow\Inject]
    protected EntityManagerInterface $entityManager;

    #[Flow\Inject]
    protected DebugService $debugService;

    protected DebugStack $sqlLoggingStack;

    #[Flow\Inject]
    protected ContextFactoryInterface $contextFactory;

    protected int $contentCacheHits = 0;

    /**
     * @var string[]
     */
    protected array $contentCacheMisses = [];

    protected array $resourceStreamRequests = [];

    protected array $thumbnails = [];

    #[Flow\InjectConfiguration('serverTimingHeader.enabled', 'Flowpack.Neos.Debug')]
    protected ?bool $serverTimingHeaderEnabled;

    #[Flow\InjectConfiguration('htmlOutput.enabled', 'Flowpack.Neos.Debug')]
    protected ?bool $htmlOutputEnabled;

    #[Flow\Inject]
    protected MessagesCollector $messagesCollector;

    #[Flow\Inject]
    protected CacheAccessCollector $cacheAccessCollector;

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Around("method(Neos\Neos\View\FusionView->render()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addDebugValuesToNeosFusionView(JoinPointInterface $joinPoint): string|Response
    {
        return $this->addDebugValues($joinPoint);
    }

    #[Flow\Around("method(Neos\Fusion\View\FusionView->render()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addDebugValuesToDefaultFusionView(JoinPointInterface $joinPoint): string|Response
    {
        return $this->addDebugValues($joinPoint);
    }

    protected function addDebugValues(JoinPointInterface $joinPoint): string|Response
    {
        $startRenderAt = microtime(true) * 1000;
        $response = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $endRenderAt = microtime(true) * 1000;

        $renderTime = round($endRenderAt - $startRenderAt, 2);
        $sqlExecutionTime = round($this->sqlLoggingStack->executionTime, 2);

        if ($this->serverTimingHeaderEnabled) {
            $this->debugService->addMetric('fusionRenderTime', $renderTime, 'Fusion rendering');
            $this->debugService->addMetric('sqlExecutionTime', $sqlExecutionTime, 'Combined SQL execution');
            if (!$this->contentCacheMisses) {
                $this->debugService->addMetric('contentCacheHit', null, 'Content cache hit');
            } else {
                $this->debugService->addMetric('contentCacheMiss', null, 'Content cache miss');
            }
        }

        if (!$this->htmlOutputEnabled) {
            return $response;
        }

        if ($response instanceof Response) {
            $output = $response->getBody()?->getContents();
            $response->getBody()?->rewind();

            if ($response->getHeader('Content-Type') !== 'text/html' && !str_contains($output, '<!DOCTYPE html>')) {
                return $response;
            }
        } else {
            $output = $response;
        }

        $groupedQueries = $this->groupQueries($this->sqlLoggingStack->queries);

        // Analyse ContentContext
        $contentContextMetrics = [];
        foreach ($this->contextFactory->getInstances() as $contextIdentifier => $context) {
            $firstLevelNodeCache = $context->getFirstLevelNodeCache();
            $contentContextMetrics[$contextIdentifier] = [
                'workspace' => $context->getWorkspace()->getName(),
                'dimensions' => $context->getDimensions(),
                'invisibleContentShown' => $context->isInvisibleContentShown(),
                'removedContentShown' => $context->isRemovedContentShown(),
                'inaccessibleContentShown' => $context->isInaccessibleContentShown(),
                'firstLevelNodeCache' => [
                    'nodesByPath' => count(ObjectAccess::getProperty($firstLevelNodeCache, 'nodesByPath', true)),
                    'nodesByIdentifier' => count(ObjectAccess::getProperty($firstLevelNodeCache, 'nodesByIdentifier', true)),
                    'childNodesByPathAndNodeTypeFilter' => count(ObjectAccess::getProperty($firstLevelNodeCache, 'childNodesByPathAndNodeTypeFilter', true)),
                ],
            ];
        }

        // TODO: Introduce DTOs for the data
        $data = [
            'startRenderAt' => $startRenderAt,
            'endRenderAt' => $endRenderAt,
            'renderTime' => $renderTime,
            'sqlData' => [
                'queryCount' => $this->sqlLoggingStack->queryCount,
                'executionTime' => $sqlExecutionTime,
                'tables' => $this->sqlLoggingStack->tables,
                'slowQueries' => $this->sqlLoggingStack->slowQueries,
                'groupedQueries' => $groupedQueries,
            ],
            'cCacheHits' => $this->contentCacheHits,
            'cCacheMisses' => $this->contentCacheMisses,
            'cCacheUncached' => 0,
            // Init as 0 as the actual number has to be resolved from the individual cache entries
            'resourceStreamRequests' => $this->resourceStreamRequests,
            'thumbnails' => $this->thumbnails,
            'additionalMetrics' => [
                // TODO: Iterate over all existing collectors
                $this->messagesCollector->getName() => $this->messagesCollector->collect(),
                $this->cacheAccessCollector->getName() => $this->cacheAccessCollector->collect(),
                'contentContextMetrics' => $contentContextMetrics,
            ]
        ];

        $debugOutput = '<!--__NEOS_DEBUG__ ' . json_encode($data) . '-->';
        $htmlEndPosition = strpos($output, '</html>');

        if ($htmlEndPosition === false) {
            $output .= $debugOutput;
        } else {
            $output = substr($output, 0, $htmlEndPosition) . $debugOutput . substr($output, $htmlEndPosition);
        }

        if ($response instanceof Response) {
            return $response->withBody(Utils::streamFor($output));
        }
        return $output;
    }

    #[Flow\Before("method(Neos\Flow\Mvc\Routing\Router->route()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function startSqlLogging(JoinPointInterface $joinPoint): void
    {
        $this->sqlLoggingStack = new DebugStack();
        $this->entityManager->getConfiguration()->setSQLLogger($this->sqlLoggingStack);
    }

    /**
     * Create an entry for each resource stream request.
     * Those can slow down rendering significantly, so we want to know about them.
     */
    #[Flow\Before("method(Neos\Flow\ResourceManagement\ResourceManager->getStreamByResource()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addResourceStreamRequest(JoinPointInterface $joinPoint): void
    {
        /** @var PersistentResource $resource */
        $resource = $joinPoint->getMethodArgument('resource');
        if ($resource) {
            $this->resourceStreamRequests[] = ResourceStreamRequest::fromResource($resource);
        }
    }

    /**
     * Create an entry for each resource stream request.
     * Those can slow down rendering significantly, so we want to know about them.
     */
    #[Flow\AfterReturning("method(Neos\Media\Domain\Service\ThumbnailService->getThumbnail()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addGeneratedThumbnails(JoinPointInterface $joinPoint): void
    {
        /** @var AssetInterface $asset */
        $asset = $joinPoint->getMethodArgument('asset');
        if ($asset) {
            if (!array_key_exists($asset->getResource()->getSha1(), $this->thumbnails)) {
                $this->thumbnails[$asset->getResource()->getSha1()] = 1;
            } else {
                $this->thumbnails[$asset->getResource()->getSha1()]++;
            }

            $this->messagesCollector->addMessage(
                $asset->getResource()->getFilename() . ' (' . $asset->getResource()->getCollectionName() . ')',
                'Thumbnail generated',
            );
        }
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->getCachedSegment()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addCacheMiss(JoinPointInterface $joinPoint): mixed
    {
        $fusionPath = $joinPoint->getMethodArgument('fusionPath');

        $result = $joinPoint->getAdviceChain()->proceed($joinPoint);
        if ($result === false) {
            $this->contentCacheMisses[] = $fusionPath;
        }
        return $result;
    }

    #[Flow\AfterReturning("method(Neos\Fusion\Core\Cache\ContentCache->replaceCachePlaceholders()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addCacheHit(JoinPointInterface $joinPoint): void
    {
        $result = $joinPoint->getResult();
        $this->contentCacheHits += $result;
    }

    /**
     * TODO: Move into a helper class
     * @param array{sql: string, table: string, params: array, types: string, executionMS: int} $queries
     */
    protected function groupQueries(array $queries): array
    {
        return array_reduce($queries, static function ($carry, $queryData) {
            ['sql' => $sql, 'table' => $table, 'params' => $params, 'executionMS' => $executionMS] = $queryData;
            $paramString = json_encode($params);

            if (!array_key_exists($table, $carry)) {
                $carry[$table] = [];
            }

            if (!array_key_exists($sql, $carry[$table])) {
                $carry[$table][$sql] = [
                    'executionTimeSum' => 0,
                    'count' => 0,
                    'params' => [],
                ];
            }

            $carry[$table][$sql]['executionTimeSum'] += $executionMS;
            $carry[$table][$sql]['count']++;

            if (!array_key_exists($paramString, $carry[$table][$sql]['params'])) {
                $carry[$table][$sql]['params'][$paramString] = 1;
            } else {
                $carry[$table][$sql]['params'][$paramString]++;
            }

            return $carry;
        }, []);
    }
}

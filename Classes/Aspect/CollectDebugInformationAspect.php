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
use Flowpack\Neos\Debug\DataCollector\DataCollectorInterface;
use Flowpack\Neos\Debug\DataCollector\DebugAttributeCollector;
use Flowpack\Neos\Debug\Domain\Model\Dto\ResourceStreamRequest;
use Flowpack\Neos\Debug\Logging\DebugStack;
use Flowpack\Neos\Debug\Service\DebugService;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Utils;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\Core\Bootstrap;
use Neos\Flow\Exception;
use Neos\Flow\Reflection\ReflectionService;
use Neos\Flow\ResourceManagement\PersistentResource;
use Neos\Media\Domain\Model\AssetInterface;
use Neos\Media\Domain\Model\Thumbnail;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamInterface;

#[Flow\Scope('singleton')]
#[Flow\Aspect]
class CollectDebugInformationAspect
{
    #[Flow\Inject]
    protected EntityManagerInterface $entityManager;

    #[Flow\Inject]
    protected DebugService $debugService;

    #[Flow\Inject]
    protected Bootstrap $bootstrap;

    #[Flow\Inject]
    protected ReflectionService $reflectionService;

    protected DebugStack $sqlLoggingStack;

    protected int $contentCacheHits = 0;

    /**
     * @var string[]
     */
    protected array $contentCacheMisses = [];

    /**
     * List of resource stream requests that were made during rendering.
     * @var ResourceStreamRequest[]
     */
    protected array $resourceStreamRequests = [];

    /**
     * Map of resource sha1 to the names of generated thumbnails
     * @var array<string, string[]>
     */
    protected array $thumbnails = [];

    #[Flow\InjectConfiguration('serverTimingHeader.enabled', 'Flowpack.Neos.Debug')]
    protected ?bool $serverTimingHeaderEnabled;

    #[Flow\InjectConfiguration('htmlOutput.enabled', 'Flowpack.Neos.Debug')]
    protected ?bool $htmlOutputEnabled;

    #[Flow\Inject]
    protected DebugAttributeCollector $debugAttributeCollector;

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Around("method(Neos\Neos\View\FusionView->render()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addDebugValuesToNeosFusionView(JoinPointInterface $joinPoint
    ): string|ResponseInterface|StreamInterface {
        return $this->addDebugValues($joinPoint);
    }

    #[Flow\Around("method(Neos\Fusion\View\FusionView->render()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addDebugValuesToDefaultFusionView(JoinPointInterface $joinPoint
    ): string|ResponseInterface|StreamInterface {
        return $this->addDebugValues($joinPoint);
    }

    protected function addDebugValues(JoinPointInterface $joinPoint): string|ResponseInterface|StreamInterface
    {
        $startRenderAt = microtime(true) * 1000;
        /** @var string|ResponseInterface|StreamInterface $response */
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

        if ($response instanceof ResponseInterface) {
            /**
             * There are cases where the response is not a stream
             * @var StreamInterface|null $responseBody
             */
            $responseBody = $response->getBody();
            if ($responseBody instanceof StreamInterface) {
                $output = $responseBody->getContents();
                $responseBody->rewind();
            } else {
                $output = '';
            }

            $contentType = $response->getHeaderLine('Content-Type');
            if (!str_contains($contentType, 'text/html') && !str_contains($output, '<!DOCTYPE html')) {
                return $response;
            }
        } else {
            $output = $response;
        }

        $groupedQueries = $this->groupQueries($this->sqlLoggingStack->queries);

        $additionalMetrics = array_reduce($this->getDataCollectors(), static function (array $metrics, DataCollectorInterface $collector) {
            $metrics[$collector->getName()] = $collector->collect();
            return $metrics;
        }, []);

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
            'additionalMetrics' => $additionalMetrics,
        ];
        $output = (string)$output;
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

        if ($response instanceof StreamInterface) {
            return Utils::streamFor($output);
        }

        return $output;
    }

    #[Flow\Before("method(Neos\Flow\Mvc\Routing\Router->route()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function startSqlLogging(JoinPointInterface $joinPoint): void
    {
        $configuredSqlLogger = $this->entityManager->getConfiguration()->getSQLLogger();
        $this->sqlLoggingStack = new DebugStack($configuredSqlLogger);
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
        $thumbnailOrOriginalAsset = $joinPoint->getResult();
        if ($asset && $thumbnailOrOriginalAsset instanceof Thumbnail) {
            $hash = $asset->getResource()->getSha1();
            if (!array_key_exists($hash, $this->thumbnails)) {
                $this->thumbnails[$hash] = [];
            }
            $this->thumbnails[$hash][] = $asset->getResource()->getFilename() . ' (' . $asset->getResource()->getCollectionName() . ')';
        }
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->getCachedSegment()) && Flowpack\Neos\Debug\Aspect\CollectDebugInformationAspect->debuggingActive")]
    public function addCacheMiss(JoinPointInterface $joinPoint): mixed
    {
        /** @var string $fusionPath */
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
        /** @var bool|int $result */
        $result = $joinPoint->getResult();
        $this->contentCacheHits += $result ?: 0;
    }

    /**
     * TODO: Move into a helper class
     * @param array<int, array{sql: string, table: string, params: array<string, mixed>|null, types: array<string, string>|null, executionMS: float}> $queries
     * @return array<string, array{queries: array<string, array{executionTimeSum: float, count: int, params: array<string, int>}>, executionTimeSum: float, count: int}>
     */
    protected function groupQueries(array $queries): array
    {
        /** @var array<string, array{queries: array<string, array{executionTimeSum: float, count: int, params: array<string, int>}>, executionTimeSum: float, count: int}> $initial */
        $initial = [];
        return array_reduce($queries, static function (array $carry, array $queryData): array {
            $sql = $queryData['sql'];
            $table = $queryData['table'];
            $params = $queryData['params'];
            $executionMS = $queryData['executionMS'];
            $paramString = (string)json_encode($params);

            if (!array_key_exists($table, $carry)) {
                $carry[$table] = [
                    'queries' => [],
                    'executionTimeSum' => 0,
                    'count' => 0,
                ];
            }

            if (!array_key_exists($sql, $carry[$table]['queries'])) {
                $carry[$table]['queries'][$sql] = [
                    'executionTimeSum' => 0,
                    'count' => 0,
                    'params' => [],
                ];
            }

            $carry[$table]['executionTimeSum'] += $executionMS;
            $carry[$table]['count']++;
            $carry[$table]['queries'][$sql]['executionTimeSum'] += $executionMS;
            $carry[$table]['queries'][$sql]['count']++;

            if (!array_key_exists($paramString, $carry[$table]['queries'][$sql]['params'])) {
                $carry[$table]['queries'][$sql]['params'][$paramString] = 1;
            } else {
                $carry[$table]['queries'][$sql]['params'][$paramString]++;
            }

            return $carry;
        }, $initial);
    }


    /**
     * @return DataCollectorInterface[]
     * @throws Exception
     */
    public function getDataCollectors(): array
    {
        $objectManager = $this->bootstrap->getObjectManager();
        $dataCollectors = [];
        $classNames = $this->reflectionService->getAllImplementationClassNamesForInterface(
            DataCollectorInterface::class
        );
        foreach ($classNames as $className) {
            $objectName = $objectManager->getObjectNameByClassName($className);
            if (!$objectName || !$className::canBeLoaded()) {
                continue;
            }
            $dataCollector = $objectManager->get($objectName);
            if ($dataCollector instanceof DataCollectorInterface) {
                $dataCollectors[] = $dataCollector;
            }
        }
        return $dataCollectors;
    }
}

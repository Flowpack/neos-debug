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

use Flowpack\Neos\Debug\Service\RenderTimer;
use Neos\Cache\CacheAwareInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Fusion\Core\Cache\ContentCache;
use Neos\Fusion\FusionObjects\AbstractFusionObject;
use Neos\Utility\Exception\PropertyNotAccessibleException;
use Neos\Utility\ObjectAccess;

#[Flow\Scope("singleton")]
#[Flow\Aspect]
class ContentCacheSegmentAspect
{
    public const MODE_CACHED = 'cached';
    public const MODE_UNCACHED = 'uncached';
    public const MODE_DYNAMIC = 'dynamic';

    /**
     * @var array<string, mixed>
     */
    protected array $interceptedCacheEntryValues = [];

    protected string $cacheSegmentTail;

    protected AbstractFusionObject $interceptedFusionObject;

    #[Flow\Inject]
    protected RenderTimer $renderTimer;

    /**
     * @return string|false
     */
    protected function getStringMethodArgument(JoinPointInterface $joinPoint, string $argumentName): string|false
    {
        $value = $joinPoint->getMethodArgument($argumentName);
        return is_string($value) ? $value : false;
    }

    /**
     * @return array<array-key, mixed>
     */
    protected function getArrayMethodArgument(JoinPointInterface $joinPoint, string $argumentName): array
    {
        $value = $joinPoint->getMethodArgument($argumentName);
        return is_array($value) ? $value : [];
    }

    /**
     * @return string
     */
    protected function proceedAsString(JoinPointInterface $joinPoint): string
    {
        $result = $joinPoint->getAdviceChain()->proceed($joinPoint);
        return is_string($result) ? $result : '';
    }

    public function injectContentCache(ContentCache $contentCache): void
    {
        $randomCacheMarker = ObjectAccess::getProperty($contentCache, 'randomCacheMarker', true);
        if (is_string($randomCacheMarker)) {
            $this->cacheSegmentTail = ContentCache::CACHE_SEGMENT_END_TOKEN . $randomCacheMarker;
        }
    }

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled) && setting(Flowpack.Neos.Debug.htmlOutput.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->createCacheSegment()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapCachedSegment(JoinPointInterface $joinPoint): string
    {
        $segment = $this->proceedAsString($joinPoint);
        $fusionPath = $this->getStringMethodArgument($joinPoint, 'fusionPath');
        if ($fusionPath === false) {
            return $segment;
        }
        $renderMetrics = $this->renderTimer->stop($fusionPath);

        $result = $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_CACHED,
            'fusionPath' => $fusionPath,
            'renderMetrics' => $renderMetrics,
            'entryIdentifier' => $this->interceptedCacheEntryValues,
            'entryTags' => $this->getArrayMethodArgument($joinPoint, 'tags'),
            'lifetime' => $joinPoint->getMethodArgument('lifetime')
        ]);

        return is_string($result) ? $result : $segment;
    }

    /**
     * @return mixed the result of uncached segments might not be of type string, so we cannot define the return type
     * @throws PropertyNotAccessibleException
     */
    #[Flow\Around("method(Neos\Fusion\Core\Cache\RuntimeContentCache->evaluateUncached()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapEvaluateUncached(JoinPointInterface $joinPoint): mixed
    {
        $start = microtime(true);
        $segment = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $end = microtime(true);

        $path = $this->getStringMethodArgument($joinPoint, 'path');

        return $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_UNCACHED,
            'renderTime' => round(($end - $start) * 1000, 2) . ' ms',
            'fusionPath' => $path !== false ? $path : '',
            'contextVariables' => array_keys($this->getArrayMethodArgument($joinPoint, 'contextArray')),
        ]);
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->createUncachedSegment()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapUncachedSegment(JoinPointInterface $joinPoint): string
    {
        $segment = $this->proceedAsString($joinPoint);

        if ($joinPoint->isMethodArgument('contextVariables')) {
            // Neos 8.x
            $contextVariables = $this->getArrayMethodArgument($joinPoint, 'contextVariables');
        } else {
            // Neos 9.x
            $contextVariables = $this->getArrayMethodArgument($joinPoint, 'serializedContext');
        }

        $fusionPath = $this->getStringMethodArgument($joinPoint, 'fusionPath');

        $result = $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_UNCACHED,
            'fusionPath' => $fusionPath !== false ? $fusionPath : '',
            'contextVariables' => array_keys($contextVariables),
        ]);

        return is_string($result) ? $result : $segment;
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->createDynamicCachedSegment()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapDynamicSegment(JoinPointInterface $joinPoint): string
    {
        $segment = $this->proceedAsString($joinPoint);

        if ($joinPoint->isMethodArgument('contextVariables')) {
            // Neos 8.x
            $contextVariables = $this->getArrayMethodArgument($joinPoint, 'contextVariables');
        } else {
            // Neos 9.x
            $contextVariables = $this->getArrayMethodArgument($joinPoint, 'serializedContext');
        }

        $fusionPath = $this->getStringMethodArgument($joinPoint, 'fusionPath');

        $result = $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_DYNAMIC,
            'fusionPath' => $fusionPath !== false ? $fusionPath : '',
            'entryIdentifier' => $this->interceptedCacheEntryValues,
            'entryTags' => $this->getArrayMethodArgument($joinPoint, 'tags'),
            'lifetime' => $joinPoint->getMethodArgument('lifetime'),
            'contextVariables' => array_keys($contextVariables),
            'entryDiscriminator' => $joinPoint->getMethodArgument('cacheDiscriminator'),
        ]);

        return is_string($result) ? $result : $segment;
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->renderContentCacheEntryIdentifier()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function interceptContentCacheEntryIdentifier(JoinPointInterface $joinPoint): string
    {
        $fusionPath = $this->getStringMethodArgument($joinPoint, 'fusionPath');
        $cacheIdentifierValues = $joinPoint->getMethodArgument('cacheIdentifierValues');
        $this->interceptedCacheEntryValues = [];

        if (is_array($cacheIdentifierValues)) {
            foreach ($cacheIdentifierValues as $key => $value) {
                if ($value instanceof CacheAwareInterface) {
                    $this->interceptedCacheEntryValues[(string)$key] = $value->getCacheEntryIdentifier();
                } elseif (is_string($value) || is_bool($value) || is_int($value)) {
                    $this->interceptedCacheEntryValues[(string)$key] = $value;
                }
            }
        }

        $result = $this->proceedAsString($joinPoint);
        if ($fusionPath !== false) {
            $this->interceptedCacheEntryValues['[fusionPath]'] = htmlspecialchars($fusionPath);
        }
        $this->interceptedCacheEntryValues['=> hashed identifier'] = $result;
        return $result;
    }

    #[Flow\Before("method(Neos\Fusion\Core\Cache\RuntimeContentCache->postProcess()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function interceptFusionObject(JoinPointInterface $joinPoint): void
    {
        $fusionObject = $joinPoint->getMethodArgument('fusionObject');
        if ($fusionObject instanceof AbstractFusionObject) {
            $this->interceptedFusionObject = $fusionObject;
        }
    }

    /**
     * @param mixed $segment This is mixed as the RuntimeContentCache might also return none string values
     * @param array{mode?: string, entryIdentifier?: array<string, mixed>} $info
     * @return mixed the cached data might not be of type string, so we cannot define the return type
     */
    protected function renderCacheInfoIntoSegment(mixed $segment, array $info): mixed
    {
        try {
            $fusionObjectName = ObjectAccess::getProperty($this->interceptedFusionObject, 'fusionObjectName', true);
        } catch (PropertyNotAccessibleException) {
            return $segment;
        }

        $injectPosition = 2;
        $info = array_slice($info, 0, $injectPosition, true)
            + ['fusionObject' => $fusionObjectName]
            + array_slice($info, $injectPosition, count($info) - $injectPosition, true);

        // Add debug data only to html output
        $entryIdentifier = $info['entryIdentifier'] ?? null;
        $segmentFormat = is_array($entryIdentifier) ? $entryIdentifier['format'] ?? null : null;

        if ($segmentFormat !== 'html') {
            return $segment;
        }

        $info['created'] = (new \DateTime())->format(DATE_W3C);

        $cCacheDebugData = '<!--__NEOS_CONTENT_CACHE_DEBUG__ ' . json_encode($info) . ' -->';

        if (!is_string($segment)) {
            return $cCacheDebugData;
        }

        if ($info['mode'] === self::MODE_UNCACHED && !str_contains($segment, $this->cacheSegmentTail)) {
            // on a second page load, when outer caches are created, the uncached will be evaluated via
            // RuntimeContentCache->evaluateUncached() which won't add the cache marker. So we can just append
            // the metadata
            return $segment . $cCacheDebugData;
        }

        $segmentHead = substr($segment, 0, strlen($segment) - strlen($this->cacheSegmentTail));
        $segmentEnd = $this->cacheSegmentTail;

        // Ensure we don't place comments outside the html tag
        $htmlEndPosition = strpos($segmentHead, '</html>');
        if ($htmlEndPosition !== false) {
            $segmentEnd = substr($segmentHead, $htmlEndPosition) . $segmentEnd;
            $segmentHead = substr($segmentHead, 0, $htmlEndPosition);
        }

        return $segmentHead . $cCacheDebugData . $segmentEnd;
    }
}

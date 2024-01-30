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

    protected array $interceptedCacheEntryValues = [];

    protected string $cacheSegmentTail;

    protected AbstractFusionObject $interceptedFusionObject;

    #[Flow\Inject]
    protected RenderTimer $renderTimer;

    public function injectContentCache(ContentCache $contentCache): void
    {
        $randomCacheMarker = ObjectAccess::getProperty($contentCache, 'randomCacheMarker', true);
        $this->cacheSegmentTail = ContentCache::CACHE_SEGMENT_END_TOKEN . $randomCacheMarker;
    }

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled) && setting(Flowpack.Neos.Debug.htmlOutput.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->createCacheSegment()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapCachedSegment(JoinPointInterface $joinPoint): string
    {
        $segment = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $fusionPath = $joinPoint->getMethodArgument('fusionPath');
        $renderTime = $this->renderTimer->stop($fusionPath);

        return $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_CACHED,
            'fusionPath' => $fusionPath,
            'renderMetrics' => $renderTime,
            'entryIdentifier' => $this->interceptedCacheEntryValues,
            'entryTags' => $joinPoint->getMethodArgument('tags'),
            'lifetime' => $joinPoint->getMethodArgument('lifetime')
        ]);
    }

    /**
     * @return mixed the result of uncached segments might not be of type string, so we cannot define the return type
     */
    #[Flow\Around("method(Neos\Fusion\Core\Cache\RuntimeContentCache->evaluateUncached()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapEvaluateUncached(JoinPointInterface $joinPoint): mixed
    {
        $start = microtime(true);
        $segment = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $end = microtime(true);

        return $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_UNCACHED,
            'renderTime' => round(($end - $start) * 1000, 2) . ' ms',
            'fusionPath' => $joinPoint->getMethodArgument('path'),
            'contextVariables' => array_keys($joinPoint->getMethodArgument('contextArray')),
            ''
        ]);
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->createUncachedSegment()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapUncachedSegment(JoinPointInterface $joinPoint): string
    {
        $segment = $joinPoint->getAdviceChain()->proceed($joinPoint);

        return $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_UNCACHED,
            'fusionPath' => $joinPoint->getMethodArgument('fusionPath'),
            'contextVariables' => array_keys($joinPoint->getMethodArgument('contextVariables')),
        ]);
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->createDynamicCachedSegment()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function wrapDynamicSegment(JoinPointInterface $joinPoint): string
    {
        $segment = $joinPoint->getAdviceChain()->proceed($joinPoint);

        return $this->renderCacheInfoIntoSegment($segment, [
            'mode' => static::MODE_DYNAMIC,
            'fusionPath' => $joinPoint->getMethodArgument('fusionPath'),
            'entryIdentifier' => $this->interceptedCacheEntryValues,
            'entryTags' => $joinPoint->getMethodArgument('tags'),
            'lifetime' => $joinPoint->getMethodArgument('lifetime'),
            'contextVariables' => array_keys($joinPoint->getMethodArgument('contextVariables')),
            'entryDiscriminator' => $joinPoint->getMethodArgument('cacheDiscriminator'),
        ]);
    }

    #[Flow\Around("method(Neos\Fusion\Core\Cache\ContentCache->renderContentCacheEntryIdentifier()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function interceptContentCacheEntryIdentifier(JoinPointInterface $joinPoint): string
    {
        $fusionPath = $joinPoint->getMethodArgument('fusionPath');
        $cacheIdentifierValues = $joinPoint->getMethodArgument('cacheIdentifierValues');
        $this->interceptedCacheEntryValues = [];

        foreach ($cacheIdentifierValues as $key => $value) {
            if ($value instanceof CacheAwareInterface) {
                $this->interceptedCacheEntryValues[$key] = $value->getCacheEntryIdentifier();
            } elseif (is_string($value) || is_bool($value) || is_int($value)) {
                $this->interceptedCacheEntryValues[$key] = $value;
            }
        }

        $result = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $this->interceptedCacheEntryValues['[fusionPath]'] = htmlspecialchars($fusionPath);
        $this->interceptedCacheEntryValues['=> hashed identifier'] = $result;
        return $result;
    }

    #[Flow\Before("method(Neos\Fusion\Core\Cache\RuntimeContentCache->postProcess()) && Flowpack\Neos\Debug\Aspect\ContentCacheSegmentAspect->debuggingActive")]
    public function interceptFusionObject(JoinPointInterface $joinPoint): void
    {
        $this->interceptedFusionObject = $joinPoint->getMethodArgument('fusionObject');
    }

    /**
     * @param mixed $segment This is mixed as the RuntimeContentCache might also return none string values
     * @return mixed the cached data might not be of type string, so we cannot define the return type
     * @throws PropertyNotAccessibleException
     */
    protected function renderCacheInfoIntoSegment($segment, array $info): mixed
    {
        $injectPosition = 2;
        $info = array_slice($info, 0, $injectPosition, true)
            + ['fusionObject' => ObjectAccess::getProperty($this->interceptedFusionObject, 'fusionObjectName', true)]
            + array_slice($info, $injectPosition, count($info) - $injectPosition, true);

        // Add debug data only to html output
        $segmentFormat = $info['entryIdentifier']['format'] ?? null;

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

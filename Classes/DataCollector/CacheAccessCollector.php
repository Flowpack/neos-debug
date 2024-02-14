<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\Domain\Model\Dto\CacheMonitorMetrics;
use Neos\Flow\Annotations as Flow;

#[Flow\Scope("singleton")]
class CacheAccessCollector extends AbstractDataCollector
{
    /**
     * @var CacheMonitorMetrics[]
     */
    protected static array $metricsByCache = [];

    public function getName(): string
    {
        return 'cacheAccess';
    }

    public static function registerCache(string $cacheIdentifier, string $cacheType): void
    {
        if (!isset(self::$metricsByCache[$cacheIdentifier])) {
            self::$metricsByCache[$cacheIdentifier] = new CacheMonitorMetrics($cacheIdentifier, $cacheType);
        }
    }

    public static function trackGet(string $cacheIdentifier, string $entryIdentifier, bool $hit): void
    {
        self::$metricsByCache[$cacheIdentifier]?->trackAccess($entryIdentifier, $hit);
    }

    public static function trackSet(string $cacheIdentifier, string $entryIdentifier): void
    {
        self::$metricsByCache[$cacheIdentifier]?->trackUpdate($entryIdentifier);
    }

    /**
     * @return CacheMonitorMetrics[]
     */
    public function collect(): array
    {
        return self::$metricsByCache;
    }
}

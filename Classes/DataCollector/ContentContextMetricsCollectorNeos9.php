<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool;

class ContentContextMetricsCollectorNeos9 extends AbstractDataCollector implements ContentContextMetricsCollectorInterface
{
    public function getName(): string
    {
        return 'contentContextMetrics';
    }

    /**
     * This collector only works with Neos 9+ which doesn't have the ContextFactoryInterface anymore
     */
    public static function canBeLoaded(): bool
    {
        return class_exists(\Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool::class);
    }

    /**
     * @return array<string, mixed>
     */
    public function collect(): array
    {
        return [];
    }
}

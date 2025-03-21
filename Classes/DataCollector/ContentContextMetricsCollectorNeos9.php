<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\Domain\Model\Dto\CacheMonitorMetrics;
use Neos\Flow\Annotations as Flow;

class ContentContextMetricsCollectorNeos9 extends AbstractDataCollector implements ContentContextMetricsCollectorInterface
{
    public function getName(): string
    {
        return 'contentContextMetrics';
    }

    /**
     * @return array<string, mixed>
     */
    public function collect(): array
    {
        return [];
    }
}

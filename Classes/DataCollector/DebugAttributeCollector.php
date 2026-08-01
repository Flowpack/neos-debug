<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Neos\Flow\Annotations as Flow;

#[Flow\Scope("singleton")]
class DebugAttributeCollector extends AbstractDataCollector
{
    /**
     * @var array<string, array{label: string, fusionPath: string, fusionObjectName: string, count: int, totalTime: float, minTime: float, maxTime: float}>
     */
    protected array $records = [];

    public function record(string $fusionPath, float $renderTime, string $fusionObjectName, ?string $label = null): void
    {
        $key = $label ?? $fusionPath;

        if (!isset($this->records[$key])) {
            $this->records[$key] = [
                'label' => $key,
                'fusionPath' => $fusionPath,
                'fusionObjectName' => $fusionObjectName,
                'count' => 0,
                'totalTime' => 0.0,
                'minTime' => PHP_FLOAT_MAX,
                'maxTime' => 0.0,
            ];
        }

        $this->records[$key]['count']++;
        $this->records[$key]['totalTime'] += $renderTime;
        $this->records[$key]['minTime'] = min($this->records[$key]['minTime'], $renderTime);
        $this->records[$key]['maxTime'] = max($this->records[$key]['maxTime'], $renderTime);
    }

    public function collect(): array
    {
        $result = [];
        foreach ($this->records as $key => $record) {
            $record['avgTime'] = round($record['totalTime'] / $record['count'], 2);
            $record['totalTime'] = round($record['totalTime'], 2);
            $result[] = $record;
        }
        return $result;
    }

    public function getName(): string
    {
        return 'debugMarkedPrototypes';
    }

    public function reset(): void
    {
        $this->records = [];
    }
}

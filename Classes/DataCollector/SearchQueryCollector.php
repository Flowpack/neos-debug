<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Neos\Flow\Annotations as Flow;

#[Flow\Scope("singleton")]
class SearchQueryCollector extends AbstractDataCollector
{
    /**
     * @var array<int, array{className: string, methodName: string, executionTime: float}>
     */
    private array $queries = [];

    public function getName(): string
    {
        return 'searchQueries';
    }

    public function addQuery(string $className, string $methodName, float $executionTime): void
    {
        $this->queries[] = [
            'className' => $className,
            'methodName' => $methodName,
            'executionTime' => round($executionTime, 2),
        ];
    }

    /**
     * @return array<int, array{className: string, methodName: string, executionTime: float}>
     */
    public function collect(): array
    {
        return $this->queries;
    }
}

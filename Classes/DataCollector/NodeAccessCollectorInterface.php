<?php
declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

interface NodeAccessCollectorInterface
{
    public function getName(): string;

    /**
     * @return array<string, mixed>
     */
    public function collect(): array;
}

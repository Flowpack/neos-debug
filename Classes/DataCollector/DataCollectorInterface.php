<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

interface DataCollectorInterface
{
    public function collect(): array;

    public function getName(): string;

}

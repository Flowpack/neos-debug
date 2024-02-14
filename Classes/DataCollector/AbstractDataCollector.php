<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;

abstract class AbstractDataCollector implements DataCollectorInterface
{

    public function __construct(
        protected ?DataFormatterInterface $dataFormatter = null,
    ) {
    }
}

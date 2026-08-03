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

    /**
     * Override this in your implementation if the collector can only be loaded depending on the environment
     */
    public static function canBeLoaded(): bool
    {
        return true;
    }
}

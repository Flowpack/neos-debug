<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\ObjectManagement\ObjectManagerInterface;

class ContentContextMetricsCollectorFactory
{
    public function __construct(
        protected ObjectManagerInterface $objectManager,
        protected ?DataFormatterInterface $dataFormatter = null,
    )
    {
    }

    public function build(): ?ContentContextMetricsCollectorInterface
    {
        // ContextFactory only exists before Neos 9.x
        if (interface_exists(\Neos\ContentRepository\Domain\Service\ContextFactoryInterface::class)) {
            return new ContentContextMetricsCollectorNeos8(
                $this->dataFormatter,
                $this->objectManager->get(\Neos\ContentRepository\Domain\Service\ContextFactoryInterface::class)
            );
        } else {
            return new ContentContextMetricsCollectorNeos9(
                $this->dataFormatter
            );
        }
    }
}

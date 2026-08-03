<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\ObjectManagement\ObjectManagerInterface;

/**
 * This factory provides the correct implementation based on the current Neos version
 */
class NodeAccessCollectorFactory
{
    public function __construct(
        protected ObjectManagerInterface $objectManager,
        protected ?DataFormatterInterface $dataFormatter = null,
    )
    {
    }

    public function build(): ?NodeAccessCollectorInterface
    {
        // ContextFactoryInterface only exists before Neos 9.x
        if (interface_exists(\Neos\ContentRepository\Domain\Service\ContextFactoryInterface::class)) {
            /** @var \Neos\ContentRepository\Domain\Service\ContextFactoryInterface $contextFactory */
            $contextFactory = $this->objectManager->get(\Neos\ContentRepository\Domain\Service\ContextFactoryInterface::class);
            return new NodeAccessCollectorNeos8(
                $this->dataFormatter,
                $contextFactory,
            );
        } else {
            /** @var \Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool $subgraphCachePool */
            $subgraphCachePool = $this->objectManager->get(\Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool::class);
            return new NodeAccessCollectorNeos9(
                $this->dataFormatter,
                $subgraphCachePool,
            );
        }
    }
}

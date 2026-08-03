<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;
use Neos\ContentRepository\Domain\Service\ContextFactoryInterface;
use Neos\Utility\ObjectAccess;

class NodeAccessCollectorNeos8 extends AbstractDataCollector implements NodeAccessCollectorInterface
{
    public function __construct(
        ?DataFormatterInterface $dataFormatter,
        protected ContextFactoryInterface $contextFactory,
    )
    {
        parent::__construct($dataFormatter);
    }

    public function getName(): string
    {
        return 'nodeAccessMetrics';
    }

    /**
     * This collector only works with Neos 8 where the ContextFactoryInterface exists
     */
    public static function canBeLoaded(): bool
    {
        return interface_exists(\Neos\ContentRepository\Domain\Service\ContextFactoryInterface::class);
    }

    /**
     * @return array<string, mixed>
     */
    public function collect(): array
    {
        // Analyse ContentContext
        $contentContextMetrics = [];
        foreach ($this->contextFactory->getInstances() as $contextIdentifier => $context) {
            $firstLevelNodeCache = $context->getFirstLevelNodeCache();
            $contentContextMetrics[$contextIdentifier] = [
                'workspace' => $context->getWorkspace()->getName(),
                'dimensions' => $context->getDimensions(),
                'invisibleContentShown' => $context->isInvisibleContentShown(),
                'removedContentShown' => $context->isRemovedContentShown(),
                'inaccessibleContentShown' => $context->isInaccessibleContentShown(),
                'firstLevelNodeCache' => [
                    'nodesByPath' => count((array)ObjectAccess::getProperty($firstLevelNodeCache, 'nodesByPath', true)),
                    'nodesByIdentifier' => count((array)ObjectAccess::getProperty($firstLevelNodeCache, 'nodesByIdentifier', true)),
                    'childNodesByPathAndNodeTypeFilter' => count((array)ObjectAccess::getProperty($firstLevelNodeCache, 'childNodesByPathAndNodeTypeFilter', true)),
                ],
            ];
        }
        return $contentContextMetrics;
    }
}

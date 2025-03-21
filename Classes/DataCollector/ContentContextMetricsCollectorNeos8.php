<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;
use Neos\ContentRepository\Domain\Service\ContextFactoryInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Utility\ObjectAccess;

class ContentContextMetricsCollectorNeos8 extends AbstractDataCollector implements ContentContextMetricsCollectorInterface
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
        return 'contentContextMetrics';
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
                    'nodesByPath' => count(ObjectAccess::getProperty($firstLevelNodeCache, 'nodesByPath', true)),
                    'nodesByIdentifier' => count(ObjectAccess::getProperty($firstLevelNodeCache, 'nodesByIdentifier', true)),
                    'childNodesByPathAndNodeTypeFilter' => count(ObjectAccess::getProperty($firstLevelNodeCache, 'childNodesByPathAndNodeTypeFilter', true)),
                ],
            ];
        }
        return $contentContextMetrics;
    }
}

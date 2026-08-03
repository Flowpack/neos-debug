<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;
use Neos\ContentRepository\Core\Projection\ContentGraph\ContentSubgraphInterface;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\AllChildNodesByNodeIdCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\NodeByNodeAggregateIdCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\NodePathCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool;
use Neos\Neos\Domain\SubtreeTagging\NeosSubtreeTag;
use Neos\Utility\ObjectAccess;

class ContentContextMetricsCollectorNeos9 extends AbstractDataCollector implements ContentContextMetricsCollectorInterface
{
    public function __construct(
        ?DataFormatterInterface $dataFormatter,
        protected SubgraphCachePool $subgraphCachePool,
    )
    {
        parent::__construct($dataFormatter);
    }

    public function getName(): string
    {
        return 'contentContextMetrics';
    }

    /**
     * This collector only works with Neos 9+ which has the SubgraphCachePool
     */
    public static function canBeLoaded(): bool
    {
        return class_exists(\Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool::class);
    }

    /**
     * @return array<string, mixed>
     */
    public function collect(): array
    {
        /** @var array<string, ContentSubgraphInterface> $subgraphInstances */
        $subgraphInstances = ObjectAccess::getProperty($this->subgraphCachePool, 'subgraphInstancesCache', true);
        /** @var array<string, NodePathCache> $nodePathCaches */
        $nodePathCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'nodePathCaches', true);
        /** @var array<string, NodeByNodeAggregateIdCache> $nodeByNodeAggregateIdCaches */
        $nodeByNodeAggregateIdCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'nodeByNodeAggregateIdCaches', true);
        /** @var array<string, AllChildNodesByNodeIdCache> $allChildNodesByNodeIdCaches */
        $allChildNodesByNodeIdCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'allChildNodesByNodeIdCaches', true);

        // Analyse ContentSubgraph
        $contentContextMetrics = [];
        foreach ($subgraphInstances as $cacheIdentifier => $subgraph) {
            $excludedSubtreeTags = $subgraph->getVisibilityConstraints()->excludedSubtreeTags;
            $nodePathCache = $nodePathCaches[$cacheIdentifier] ?? null;
            $nodeByNodeAggregateIdCache = $nodeByNodeAggregateIdCaches[$cacheIdentifier] ?? null;
            $allChildNodesByNodeIdCache = $allChildNodesByNodeIdCaches[$cacheIdentifier] ?? null;

            $contentContextMetrics[$cacheIdentifier] = [
                'workspace' => $subgraph->getWorkspaceName()->value,
                'dimensions' => $subgraph->getDimensionSpacePoint()->coordinates,
                'invisibleContentShown' => !$excludedSubtreeTags->contain(NeosSubtreeTag::disabled()),
                'removedContentShown' => !$excludedSubtreeTags->contain(NeosSubtreeTag::removed()),
                'inaccessibleContentShown' => array_diff(
                    $excludedSubtreeTags->toStringArray(),
                    [NeosSubtreeTag::disabled()->value, NeosSubtreeTag::removed()->value],
                ) === [],
                'firstLevelNodeCache' => [
                    'nodesByPath' => $nodePathCache === null ? 0 : count((array)ObjectAccess::getProperty($nodePathCache, 'nodePaths', true)),
                    'nodesByIdentifier' => $nodeByNodeAggregateIdCache === null ? 0 : count((array)ObjectAccess::getProperty($nodeByNodeAggregateIdCache, 'nodes', true)),
                    'childNodesByPathAndNodeTypeFilter' => $allChildNodesByNodeIdCache === null ? 0 : count((array)ObjectAccess::getProperty($allChildNodesByNodeIdCache, 'childNodes', true)),
                ],
            ];
        }
        return $contentContextMetrics;
    }
}

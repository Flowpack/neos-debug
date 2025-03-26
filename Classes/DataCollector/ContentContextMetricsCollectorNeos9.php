<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataCollector;

use Flowpack\Neos\Debug\DataFormatter\DataFormatterInterface;
use Neos\ContentRepository\Core\Projection\ContentGraph\ContentSubgraphInterface;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\AllChildNodesByNodeIdCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\NamedChildNodeByNodeIdCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\NodeByNodeAggregateIdCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\NodePathCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache\ParentNodeIdByChildNodeIdCache;
use Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\SubgraphCachePool;
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
        // todo rename to subgraph metrics, but make js work with that
        return 'contentContextMetrics';
    }

    /**
     * @return array<string, mixed>
     */
    public function collect(): array
    {
        /** @var array<string,ContentSubgraphInterface> $subgraphsById */
        $subgraphsById = ObjectAccess::getProperty($this->subgraphCachePool, 'subgraphInstancesCache', true);

        /** @var array<string,NodePathCache> $nodePathCaches */
        $nodePathCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'nodePathCaches', true);
        /** @var array<string,NodeByNodeAggregateIdCache> $nodeByNodeAggregateIdCaches */
        $nodeByNodeAggregateIdCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'nodeByNodeAggregateIdCaches', true);
        /** @var array<string,AllChildNodesByNodeIdCache> $nodeByNodeAggregateIdCaches */
        $allChildNodesByNodeIdCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'allChildNodesByNodeIdCaches', true);
        /** @var array<string,NamedChildNodeByNodeIdCache> $nodeByNodeAggregateIdCaches */
        $namedChildNodeByNodeIdCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'namedChildNodeByNodeIdCaches', true);
        /** @var array<string,ParentNodeIdByChildNodeIdCache> $nodeByNodeAggregateIdCaches */
        $parentNodeIdByChildNodeIdCaches = ObjectAccess::getProperty($this->subgraphCachePool, 'parentNodeIdByChildNodeIdCaches', true);

        $subgraphMetrics = [];
        foreach ($subgraphsById as $subgraphId => $subgraph) {
            /** @var NodePathCache|null $nodePathCache */
            $nodePathCache = $nodePathCaches[$subgraphId] ?? null;
            /** @var NodeByNodeAggregateIdCache|null $nodeByNodeAggregateIdCache */
            $nodeByNodeAggregateIdCache = $nodeByNodeAggregateIdCaches[$subgraphId] ?? null;
            /** @var AllChildNodesByNodeIdCache|null $nodeByNodeAggregateIdCache */
            $allChildNodesByNodeIdCache = $allChildNodesByNodeIdCaches[$subgraphId] ?? null;
            /** @var NamedChildNodeByNodeIdCache|null $nodeByNodeAggregateIdCache */
            $namedChildNodeByNodeIdCache = $namedChildNodeByNodeIdCaches[$subgraphId] ?? null;
            /** @var ParentNodeIdByChildNodeIdCache|null $nodeByNodeAggregateIdCache */
            $parentNodeIdByChildNodeIdCache = $parentNodeIdByChildNodeIdCaches[$subgraphId] ?? null;

            $subgraphMetrics[$subgraphId] = [
                'workspace' => $subgraph->getWorkspaceName(),
                'dimensionSpacePoint' => $subgraph->getDimensionSpacePoint(),
                'visibilityConstraints' => $subgraph->getVisibilityConstraints(),
                'nodeCaches' => [
                    ...($nodePathCache ? ['nodePath' => count(ObjectAccess::getProperty($nodePathCache, 'nodePaths', true))] : []),
                    ...($nodeByNodeAggregateIdCache ? ['nodeByNodeAggregateId' => count(ObjectAccess::getProperty($nodeByNodeAggregateIdCache, 'nodes', true)) + count(ObjectAccess::getProperty($nodeByNodeAggregateIdCache, 'nonExistingNodeAggregateIds', true))] : []),
                    ...($allChildNodesByNodeIdCache ? ['allChildNodesByNodeId' => count(ObjectAccess::getProperty($allChildNodesByNodeIdCache, 'childNodes', true))] : []),
                    ...($namedChildNodeByNodeIdCache ? ['namedChildNodeByNodeId' => count(ObjectAccess::getProperty($namedChildNodeByNodeIdCache, 'nodes', true))] : []),
                    ...($parentNodeIdByChildNodeIdCache ? ['parentNodeIdByChildNodeId' => count(ObjectAccess::getProperty($parentNodeIdByChildNodeIdCache, 'parentNodeAggregateIds', true)) + count(ObjectAccess::getProperty($parentNodeIdByChildNodeIdCache, 'nodesWithoutParentNode', true))] : []),
                ],
            ];
        }
        return $subgraphMetrics;
    }
}

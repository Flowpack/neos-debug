<?php

declare(strict_types=1);

/**
 * Stub definitions for Neos 9 classes that do not exist in Neos 8.
 *
 * This file is only used for static analysis (PHPStan) via `scanFiles` in phpstan.neon,
 * so the ContentContextMetricsCollectorNeos9 collector can be analysed in a Neos 8 codebase.
 */

namespace Neos\ContentRepository\Core\Projection\ContentGraph;

interface ContentSubgraphInterface
{
    public function getWorkspaceName(): \Neos\ContentRepository\Core\SharedModel\Workspace\WorkspaceName;

    public function getDimensionSpacePoint(): \Neos\ContentRepository\Core\DimensionSpace\DimensionSpacePoint;

    public function getVisibilityConstraints(): VisibilityConstraints;
}

class VisibilityConstraints
{
    public function __construct(public \Neos\ContentRepository\Core\Feature\SubtreeTagging\Dto\SubtreeTags $excludedSubtreeTags)
    {
    }
}

namespace Neos\ContentRepository\Core\SharedModel\Workspace;

class WorkspaceName
{
    public function __construct(public string $value)
    {
    }
}

namespace Neos\ContentRepository\Core\DimensionSpace;

class DimensionSpacePoint
{
    /**
     * @param array<string, string> $coordinates
     */
    public function __construct(public array $coordinates)
    {
    }
}

namespace Neos\ContentRepository\Core\Feature\SubtreeTagging\Dto;

class SubtreeTag
{
    public function __construct(public string $value)
    {
    }
}

class SubtreeTags
{
    public function contain(SubtreeTag $tag): bool
    {
    }

    /**
     * @return array<string>
     */
    public function toStringArray(): array
    {
    }
}

namespace Neos\Neos\Domain\SubtreeTagging;

class NeosSubtreeTag
{
    public static function disabled(): \Neos\ContentRepository\Core\Feature\SubtreeTagging\Dto\SubtreeTag
    {
    }

    public static function removed(): \Neos\ContentRepository\Core\Feature\SubtreeTagging\Dto\SubtreeTag
    {
    }
}

namespace Neos\ContentRepositoryRegistry\SubgraphCachingInMemory;

class SubgraphCachePool
{
}

namespace Neos\ContentRepositoryRegistry\SubgraphCachingInMemory\InMemoryCache;

class NodePathCache
{
}

class NodeByNodeAggregateIdCache
{
}

class AllChildNodesByNodeIdCache
{
}

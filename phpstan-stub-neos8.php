<?php

declare(strict_types=1);

/**
 * Stub definitions for Neos 8 classes that do not exist in Neos 9.
 *
 * This file is only used for static analysis (PHPStan) via `scanFiles` in phpstan.neon,
 * so the ContentContextMetricsCollectorNeos8 collector can be analysed in a Neos 9 codebase.
 */

namespace Neos\ContentRepository\Domain\Service;

interface ContextFactoryInterface
{
    /**
     * @return array<string, \Neos\ContentRepository\Domain\Model\Context>
     */
    public function getInstances(): array;
}

namespace Neos\ContentRepository\Domain\Model;

class Context
{
    public function getWorkspace(): Workspace
    {
    }

    /**
     * @return array<string, array<string>>
     */
    public function getDimensions(): array
    {
    }

    public function isInvisibleContentShown(): bool
    {
    }

    public function isRemovedContentShown(): bool
    {
    }

    public function isInaccessibleContentShown(): bool
    {
    }

    public function getFirstLevelNodeCache(): FirstLevelNodeCache
    {
    }
}

class Workspace
{
    public function getName(): string
    {
    }
}

class FirstLevelNodeCache
{
}

<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Domain\Model\Dto;

use Neos\Flow\Annotations as Flow;

#[Flow\Proxy(false)]
class CacheMonitorMetrics implements \JsonSerializable
{

    protected array $cacheHits = [];
    protected array $cacheMisses = [];
    protected array $updates = [];

    public function __construct(
        public readonly string $cacheIdentifier,
        public readonly string $cacheType,
    )
    {
    }

    public function trackAccess(string $entryIdentifier, bool $hit): void
    {
        if ($hit) {
            $this->cacheHits[] = $entryIdentifier;
        } else {
            $this->cacheMisses[] = $entryIdentifier;
        }
    }

    public function trackUpdate(string $entryIdentifier): void
    {
        $this->updates[] = $entryIdentifier;
    }

    public function jsonSerialize(): array
    {
        return [
            'cacheIdentifier' => $this->cacheIdentifier,
            'cacheType' => $this->cacheType,
            'hits' => count($this->cacheHits),
            'misses' => count($this->cacheMisses),
            'updates' => count($this->updates),
        ];
    }
}

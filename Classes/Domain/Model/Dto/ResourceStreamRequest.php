<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Domain\Model\Dto;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\ResourceManagement\PersistentResource;

#[Flow\Proxy(false)]
class ResourceStreamRequest implements \JsonSerializable
{

    private function __construct(
        public readonly string $sha1,
        public readonly string $filename,
        public readonly string $collectionName,
    ) {
    }

    public static function fromResource(PersistentResource $resource): self
    {
        return new self(
            $resource->getSha1(),
            $resource->getFilename(),
            $resource->getCollectionName(),
        );
    }

    public function toArray(): array
    {
        return [
            'sha1' => $this->sha1,
            'filename' => $this->filename,
            'collectionName' => $this->collectionName,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}

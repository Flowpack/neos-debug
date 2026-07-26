<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Domain\Model\Dto;

use Neos\Flow\Annotations as Flow;

#[Flow\Proxy(false)]
class Message
{

    public readonly float $timestamp;

    public function __construct(
        public readonly string $message,
        public readonly ?string $title = null,
    ) {
        $this->timestamp = microtime(true);
    }

    /**
     * @return array{message: string, title: string|null, timestamp: float}
     */
    public function toArray(): array
    {
        return [
            'message' => $this->message,
            'title' => $this->title,
            'timestamp' => $this->timestamp,
        ];
    }
}

<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Domain\Model\Dto;

use Neos\Flow\Annotations as Flow;

#[Flow\Proxy(false)]
class RenderMetrics implements \JsonSerializable
{

    public float $renderTime = 0;
    public int $sqlQueryCount = 0;

    public function __construct(
        private readonly float $startRenderAt,
        private readonly int $startSqlQueryCount,
    ) {
    }

    public function toArray(): array
    {
        return [
            'renderTime' => $this->renderTime,
            'sqlQueryCount' => $this->sqlQueryCount,
        ];
    }

    public function stop(float $stopRenderAt, int $stopSqlQueryCount): self
    {
        $this->renderTime = round($stopRenderAt - $this->startRenderAt, 2);
        $this->sqlQueryCount = $stopSqlQueryCount - $this->startSqlQueryCount;
        return $this;
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}

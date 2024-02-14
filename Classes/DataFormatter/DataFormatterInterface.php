<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataFormatter;

interface DataFormatterInterface
{
    public function formatVar(mixed $var): string;

    public function formatDuration(float $durationInSeconds): string;

    public function formatBytes(int $bytes, int $precision = 2): string;

}

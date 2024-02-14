<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\DataFormatter;

class DataFormatter implements DataFormatterInterface
{

    public function formatVar(mixed $var): string
    {
        /** @noinspection ForgottenDebugOutputInspection */
        return \Neos\Flow\var_dump($var, null, true, true);
    }

    public function formatDuration(float $durationInSeconds): string
    {
        if ($durationInSeconds < 0.001) {
            return sprintf('%d µs', $durationInSeconds * 1000000);
        }
        if ($durationInSeconds < 1) {
            return sprintf('%.2f ms', $durationInSeconds * 1000);
        }
        return sprintf('%.2f s', $durationInSeconds);
    }

    public function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = min((int)floor(($bytes ? log($bytes) : 0) / log(1024)), count($units) - 1);

        return round($bytes / (1024 ** $pow), $precision) . ' ' . $units[$pow];
    }
}

<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Service;

/**
 * This file is part of the Flowpack.Neos.Debug package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;

#[Flow\Scope("singleton")]
class DebugService
{
    protected float $startRequestAt = 0;

    protected float $stopRequestAt = 0;

    protected array $metrics = [];

    /**
     * Starts the timer for the request process
     */
    public function startRequestTimer(): float
    {
        return $this->startRequestAt = microtime(true) * 1000;
    }

    /**
     * Sets the start-time of the request
     */
    public function setStartRequestAt(float $startRequestAt): void
    {
        $this->startRequestAt = $startRequestAt;
    }

    /**
     * Stops the timer for the request process
     */
    public function stopRequestTime(): float
    {
        return $this->stopRequestAt = microtime(true) * 1000;
    }

    /**
     * Adds a metric which will be later appended to the http header
     *
     * @param string $name the short identifier for the metric
     * @param float|null $value a numeric float value with up to 2 decimals
     * @param string|null $description the short description for the metric
     */
    public function addMetric(string $name, ?float $value = null, ?string $description = null): void
    {
        $this->metrics[$this->cleanString($name)] = [
            'value' => $value,
            'description' => $this->cleanString($description),
        ];
    }

    /**
     * Remove any special characters that might break the header
     */
    protected function cleanString(string $input): string
    {
        return preg_replace('/[^A-Za-z0-9 ]/', '', $input);
    }

    /**
     * Returns the time elapsed since `startRequestTime` and will stop the timer
     * if it has not been stopped yet.
     */
    public function getRequestTime(): float
    {
        if (!$this->stopRequestAt) {
            $this->stopRequestTime();
        }
        return round($this->stopRequestAt - $this->startRequestAt, 2);
    }

    /**
     * Returns the list of stored metrics including the request time
     */
    public function getMetrics(): array
    {
        if (!array_key_exists('processRequest', $this->metrics)) {
            $this->addMetric('processRequest', $this->getRequestTime(), 'Process request');
        }
        return $this->metrics;
    }
}

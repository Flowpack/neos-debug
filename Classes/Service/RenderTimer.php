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

use Doctrine\ORM\EntityManagerInterface;
use Flowpack\Neos\Debug\Domain\Model\Dto\RenderMetrics;
use Neos\Flow\Annotations as Flow;
use Flowpack\Neos\Debug\Logging\DebugStack;

#[Flow\Scope("singleton")]
class RenderTimer
{
    #[Flow\Inject]
    protected EntityManagerInterface $entityManager;

    /**
     * @var RenderMetrics[]
     */
    protected array $renderMetrics = [];

    /**
     * Starts a render timer for a certain fusion path
     */
    public function start(string $fusionPath): void
    {
        $sqlLoggingStack = $this->entityManager->getConfiguration()->getSQLLogger();
        $queryCount = $sqlLoggingStack instanceof DebugStack ? $sqlLoggingStack->queryCount : 0;

        $this->renderMetrics[$fusionPath] = new RenderMetrics($this->ts(), $queryCount);
    }

    /**
     * Return current micro time in ms
     */
    private function ts(): float
    {
        return microtime(true) * 1000;
    }

    /**
     * Stops the timer and returns the computed values
     */
    public function stop(string $fusionPath): ?RenderMetrics
    {
        if (!array_key_exists($fusionPath, $this->renderMetrics)) {
            return null;
        }

        $metrics = $this->renderMetrics[$fusionPath];
        $sqlLoggingStack = $this->entityManager->getConfiguration()->getSQLLogger();
        $queryCount = $sqlLoggingStack instanceof DebugStack ? $sqlLoggingStack->queryCount : 0;

        return $metrics->stop($this->ts(), $queryCount);
    }
}

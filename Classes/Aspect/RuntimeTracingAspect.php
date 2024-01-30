<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Aspect;

/**
 * This file is part of the Flowpack.Neos.Debug package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Flowpack\Neos\Debug\Service\RenderTimer;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;

/**
 * @Flow\Aspect
 * @Flow\Scope("singleton")
 */
class RuntimeTracingAspect
{
    #[Flow\Inject]
    protected RenderTimer $renderTimer;

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Before("method(Neos\Fusion\Core\Cache\RuntimeContentCache->enter()) && Flowpack\Neos\Debug\Aspect\RuntimeTracingAspect->debuggingActive")]
    public function onEnter(JoinPointInterface $joinPoint): void
    {
        $configuration = $joinPoint->getMethodArgument('configuration');
        $fusionPath = $joinPoint->getMethodArgument('fusionPath');

        $cacheMode = $configuration['mode'] ?? null;

        if (!$cacheMode) {
            return;
        }

        $this->renderTimer->start($fusionPath);
    }
}

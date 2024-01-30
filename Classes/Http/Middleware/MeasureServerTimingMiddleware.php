<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Http\Middleware;

/**
 * This file is part of the Flowpack.Neos.Debug package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Flowpack\Neos\Debug\Service\DebugService;
use Neos\Flow\Annotations as Flow;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class MeasureServerTimingMiddleware implements MiddlewareInterface
{
    public const TIMING_ATTRIBUTE = 'FlowpackNeosDebugTimingStart';

    #[Flow\InjectConfiguration("serverTimingHeader.enabled")]
    protected bool $enabled;

    #[Flow\Inject]
    protected DebugService $debugService;

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if ($this->enabled) {
            $timerStart = $this->debugService->startRequestTimer();
            $response = $handler->handle($request->withAttribute(self::TIMING_ATTRIBUTE, $timerStart));
        } else {
            $response = $handler->handle($request);
        }

        return $response;
    }
}

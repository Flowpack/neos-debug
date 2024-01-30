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

/**
 * Cache control header component
 */
class AddServerTimingMiddleware implements MiddlewareInterface
{
    #[Flow\InjectConfiguration("serverTimingHeader.enabled")]
    protected bool $enabled;

    #[Flow\Inject]
    protected DebugService $debugService;

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);

        if (! $this->enabled) {
            return $response;
        }

        $serverTiming = '';
        $this->debugService->setStartRequestAt($request->getAttribute(MeasureServerTimingMiddleware::TIMING_ATTRIBUTE));
        $metrics = $this->debugService->getMetrics();
        foreach ($metrics as $key => ['value' => $value, 'description' => $description]) {
            $serverTiming .= ($serverTiming ? ', ' : '') . $key;
            if ($description) {
                $serverTiming .=  ';desc="' . $description . '"';
            }
            if ($value !== null) {
                $serverTiming .= ';dur=' . $value;
            }
        }

        return $response->withAddedHeader('Server-Timing', $serverTiming);
    }
}

<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Aspect;

use Flowpack\Neos\Debug\DataCollector\SearchQueryCollector;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;

#[Flow\Scope('singleton')]
#[Flow\Aspect]
class SearchQueryAspect
{
    #[Flow\Inject]
    protected SearchQueryCollector $searchQueryCollector;

    #[Flow\InjectConfiguration('searchQueryTracking.enabled', 'Flowpack.Neos.Debug')]
    protected ?bool $searchQueryTrackingEnabled;

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Around("within(Neos\ContentRepository\Search\Search\QueryBuilderInterface) && method(.*->execute()) && Flowpack\Neos\Debug\Aspect\SearchQueryAspect->debuggingActive")]
    public function trackSearchQueryExecution(JoinPointInterface $joinPoint): mixed
    {
        if (!$this->searchQueryTrackingEnabled) {
            return $joinPoint->getAdviceChain()->proceed($joinPoint);
        }

        $start = microtime(true);
        $result = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $executionTime = (microtime(true) - $start) * 1000;

        $this->searchQueryCollector->addQuery(
            $joinPoint->getClassName(),
            $executionTime
        );

        return $result;
    }
}

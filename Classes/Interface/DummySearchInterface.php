<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Interface;

/**
 * Define dummy interface for the `SearchQueryAspect` if the Neos.ContentRepository.Search package hasn't been installed.
 */
interface DummySearchInterface
{
}

if (!interface_exists('Neos\ContentRepository\Search\Search\QueryBuilderInterface', false)) {
    class_alias(
        DummySearchInterface::class,
        'Neos\ContentRepository\Search\Search\QueryBuilderInterface'
    );
}

<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Cache;

use Flowpack\Neos\Debug\DataCollector\CacheAccessCollector;
use Neos\Cache\Backend\BackendInterface;
use Neos\Cache\EnvironmentConfiguration;
use Neos\Cache\Frontend\FrontendInterface;
use Neos\Flow\Annotations as Flow;

#[Flow\Scope("singleton")]
class CacheFactory extends \Neos\Flow\Cache\CacheFactory
{

    protected array $trackedBackends = [];

    public function create(
        string $cacheIdentifier,
        string $cacheObjectName,
        string $backendObjectName,
        array $backendOptions = [],
        bool $persistent = false
    ): FrontendInterface {
        $backend = $this->instantiateProxyBackend(
            $cacheIdentifier,
            $backendObjectName,
            $backendOptions,
            $this->environmentConfiguration,
            $persistent
        );
        $cache = $this->instantiateCache($cacheIdentifier, $cacheObjectName, $backend);
        $backend->setCache($cache);

        return $cache;
    }

    public function instantiateProxyBackend(
        string $cacheIdentifier,
        string $backendObjectName,
        array $backendOptions,
        EnvironmentConfiguration $environmentConfiguration,
        bool $persistent = false,
    ): BackendInterface {
        $backendObjectNameParts = explode('\\', $backendObjectName);
        $namespace = 'Flowpack\Neos\Debug\Cache';
        $proxyBackendClassName = 'NeosDebugTracked' . $cacheIdentifier . array_pop($backendObjectNameParts);
        $proxyBackendFQDN = $namespace . '\\' . $proxyBackendClassName;

        if (!isset($this->trackedBackends[$cacheIdentifier])) {
            $collectorName = '\\' . CacheAccessCollector::class;
            $this->trackedBackends[$cacheIdentifier] = true;

            $trackedBackendDefinition = '
                namespace ' . $namespace . ';
                class ' . $proxyBackendClassName . ' extends \\' . $backendObjectName . ' {
                    public function get(string $entryIdentifier): string|bool
                    {
                        $result = parent::get($entryIdentifier);
                        ' . $collectorName . '::trackGet("' . $cacheIdentifier . '", $entryIdentifier, (bool)$result);
                        return $result;
                    }
                    
                    public function set(string $entryIdentifier, string $data, array $tags = [], int $lifetime = null): void
                    {
                        $result = parent::set($entryIdentifier, $data, $tags, $lifetime);
                        ' . $collectorName . '::trackSet("' . $cacheIdentifier . '", $entryIdentifier);
                    }
                }
            ';

            eval($trackedBackendDefinition);
        }

        CacheAccessCollector::registerCache($cacheIdentifier, $backendObjectName);

        return $this->instantiateBackend(
            $proxyBackendFQDN,
            $backendOptions,
            $environmentConfiguration,
            $persistent
        );
    }
}

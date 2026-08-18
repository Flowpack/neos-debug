<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Aspect;

use Flowpack\Neos\Debug\DataCollector\DebugAttributeCollector;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Fusion\Core\Runtime;
use Neos\Fusion\Core\RuntimeConfiguration;
use Neos\Fusion\Exception as FusionException;

#[Flow\Scope("singleton")]
#[Flow\Aspect]
class DebugAttributeAspect
{
    /**
     * Start timings for fusion paths marked with "@debug", keyed by fusion path.
     *
     * @var array<string, array{start: float, label: string|null, fusionObjectName: string}>
     */
    protected array $pendingTimings = [];

    /**
     * Resolved Runtime and RuntimeConfiguration references, keyed by the intercepted
     * RuntimeContentCache proxy instance. The proxy is bound to exactly one Runtime
     * for its whole lifetime, so we can resolve both once and reuse them for the rest
     * of the request instead of running reflection on every enter()/leave() call.
     *
     * @var \SplObjectStorage<object, array{runtime: Runtime|null, runtimeConfiguration: RuntimeConfiguration|null}>
     */
    private \SplObjectStorage $proxyStateCache;

    /**
     * Lazily built reflection for the protected RuntimeContentCache::$runtime property.
     * ReflectionProperty instances are immutable for our read use and can be reused
     * across any instance of the (proxy) class.
     */
    private ?\ReflectionProperty $runtimePropertyReflection = null;

    /**
     * Lazily built reflection for the protected Runtime::$runtimeConfiguration property.
     */
    private ?\ReflectionProperty $runtimeConfigurationPropertyReflection = null;

    #[Flow\Inject]
    protected DebugAttributeCollector $debugAttributeCollector;

    public function __construct()
    {
        $this->proxyStateCache = new \SplObjectStorage();
    }

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled) && setting(Flowpack.Neos.Debug.debugMetaAttribute.enabled)")]
    public function debuggingActive(): void
    {
    }

    #[Flow\Before("method(Neos\Fusion\Core\Cache\RuntimeContentCache->enter()) && Flowpack\Neos\Debug\Aspect\DebugAttributeAspect->debuggingActive")]
    public function onEnter(JoinPointInterface $joinPoint): void
    {
        $fusionPath = $joinPoint->getMethodArgument('fusionPath');
        if (!is_string($fusionPath)) {
            return;
        }

        $fusionConfiguration = $this->getFusionConfiguration($joinPoint->getProxy(), $fusionPath);
        /** @var array<string, mixed>|null $meta */
        $meta = $fusionConfiguration['__meta'] ?? null;

        if (!isset($meta['debug'])) {
            return;
        }

        $debugValue = $meta['debug'];
        // Fusion wraps values in __value, so extract if needed
        $resolvedValue = is_array($debugValue) && isset($debugValue['__value']) ? $debugValue['__value'] : $debugValue;
        $label = is_string($resolvedValue) ? $resolvedValue : null;

        $this->pendingTimings[$fusionPath] = [
            'start' => microtime(true),
            'label' => $label,
            'fusionObjectName' => $this->getFusionObjectName($fusionConfiguration),
        ];
    }

    #[Flow\After("method(Neos\Fusion\Core\Cache\RuntimeContentCache->leave()) && Flowpack\Neos\Debug\Aspect\DebugAttributeAspect->debuggingActive")]
    public function onLeave(JoinPointInterface $joinPoint): void
    {
        $evaluateContext = $joinPoint->getMethodArgument('evaluateContext');
        $fusionPath = is_array($evaluateContext) ? ($evaluateContext['fusionPath'] ?? null) : null;
        if (!is_string($fusionPath) || !isset($this->pendingTimings[$fusionPath])) {
            return;
        }

        $timing = $this->pendingTimings[$fusionPath];
        unset($this->pendingTimings[$fusionPath]);

        $renderTime = round((microtime(true) - $timing['start']) * 1000, 2);

        $this->debugAttributeCollector->record($fusionPath, $renderTime, $timing['fusionObjectName'], $timing['label']);
    }

    /**
     * Resolve the cached Runtime + RuntimeConfiguration for the given proxy and
     * return the Fusion configuration for $fusionPath.
     *
     * @return array<string, mixed>
     * @throws FusionException
     */
    private function getFusionConfiguration(object $runtimeContentCache, string $fusionPath): array
    {
        if (!$this->proxyStateCache->contains($runtimeContentCache)) {
            $runtime = $this->readRuntimeProperty($runtimeContentCache);
            $runtimeConfiguration = $runtime instanceof Runtime
                ? $this->readRuntimeConfigurationProperty($runtime)
                : null;

            $this->proxyStateCache->attach($runtimeContentCache, [
                'runtime' => $runtime,
                'runtimeConfiguration' => $runtimeConfiguration,
            ]);
        }

        $state = $this->proxyStateCache[$runtimeContentCache];
        $runtimeConfiguration = $state['runtimeConfiguration'];
        if (!$runtimeConfiguration instanceof RuntimeConfiguration) {
            return [];
        }

        return $runtimeConfiguration->forPath($fusionPath);
    }

    private function readRuntimeProperty(object $runtimeContentCache): ?Runtime
    {
        if ($this->runtimePropertyReflection === null) {
            // Use the parent class if this is a Flow AOP proxy so the ReflectionProperty
            // targets the property declaration rather than the subclass override.
            $className = get_parent_class($runtimeContentCache) ?: false;
            if ($className === false || !property_exists($className, 'runtime')) {
                $className = $runtimeContentCache::class;
            }
            $reflection = new \ReflectionProperty($className, 'runtime');
            $reflection->setAccessible(true);
            $this->runtimePropertyReflection = $reflection;
        }

        $value = $this->runtimePropertyReflection->getValue($runtimeContentCache);
        return $value instanceof Runtime ? $value : null;
    }

    private function readRuntimeConfigurationProperty(Runtime $runtime): ?RuntimeConfiguration
    {
        if ($this->runtimeConfigurationPropertyReflection === null) {
            $className = get_parent_class($runtime);
            if ($className === false || !property_exists($className, 'runtimeConfiguration')) {
                $className = $runtime::class;
            }
            $reflection = new \ReflectionProperty($className, 'runtimeConfiguration');
            $reflection->setAccessible(true);
            $this->runtimeConfigurationPropertyReflection = $reflection;
        }

        $value = $this->runtimeConfigurationPropertyReflection->getValue($runtime);
        return $value instanceof RuntimeConfiguration ? $value : null;
    }

    /**
     * @param array<string, mixed> $fusionConfiguration
     */
    private function getFusionObjectName(array $fusionConfiguration): string
    {
        $fusionObjectName = $fusionConfiguration['__objectType'] ?? 'unknown';

        return is_string($fusionObjectName) ? $fusionObjectName : 'unknown';
    }
}

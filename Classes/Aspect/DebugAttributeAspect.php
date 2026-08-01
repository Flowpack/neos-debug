<?php

declare(strict_types=1);

namespace Flowpack\Neos\Debug\Aspect;

use Flowpack\Neos\Debug\DataCollector\DebugAttributeCollector;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Fusion\Core\Runtime;
use Neos\Fusion\Core\RuntimeConfiguration;
use Neos\Utility\ObjectAccess;

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
     * @var \SplObjectStorage<Runtime, RuntimeConfiguration>
     */
    private \SplObjectStorage $runtimeConfigurationCache;

    #[Flow\Inject]
    protected DebugAttributeCollector $debugAttributeCollector;

    public function __construct()
    {
        $this->runtimeConfigurationCache = new \SplObjectStorage();
    }

    #[Flow\Pointcut("setting(Flowpack.Neos.Debug.enabled)")]
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
     * @return array<string, mixed>
     */
    private function getFusionConfiguration(object $runtimeContentCache, string $fusionPath): array
    {
        $runtime = ObjectAccess::getProperty($runtimeContentCache, 'runtime', true);
        if (!$runtime instanceof Runtime) {
            return [];
        }

        if (!$this->runtimeConfigurationCache->contains($runtime)) {
            $runtimeConfiguration = ObjectAccess::getProperty($runtime, 'runtimeConfiguration', true);
            if ($runtimeConfiguration instanceof RuntimeConfiguration) {
                $this->runtimeConfigurationCache->attach($runtime, $runtimeConfiguration);
            }
        }

        if (!$this->runtimeConfigurationCache->contains($runtime)) {
            return [];
        }

        /** @var RuntimeConfiguration $runtimeConfiguration */
        $runtimeConfiguration = $this->runtimeConfigurationCache[$runtime];

        return $runtimeConfiguration->forPath($fusionPath);
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

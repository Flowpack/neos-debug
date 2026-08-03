import { useComputed } from '@preact/signals';

import { useDebugContext } from '../../context/DebugContext';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import CacheMetrics from './CacheMetrics';
import NodeAccessMetrics from './NodeAccessMetrics';
import DebugAttributeMetrics from './DebugAttributeMetrics';
import MessagesMetrics from './MessagesMetrics';
import ResourceStreamRequestMetrics from './ResourceStreamRequestMetrics';
import SearchQueryMetrics from './SearchQueryMetrics';
import ThumbnailGenerationMetrics from './ThumbnailGenerationMetrics';

/**
 * Overlay to display additional metrics like resource stream requests and thumbnails.
 *
 * TODO: Make this overlay more generic and allow to render custom metrics.
 */
const AdditionalMetricsOverlay = () => {
    const visible = useComputed(() => overlayState.value === 'additionalMetrics');
    const {
        debugInfos: { resourceStreamRequests, thumbnails, additionalMetrics },
    } = useDebugContext();

    if (!visible.value) return null;

    return (
        <Overlay title="Other metrics">
            <ResourceStreamRequestMetrics resourceStreamRequests={resourceStreamRequests} />
            <ThumbnailGenerationMetrics thumbnails={thumbnails} />
            {Object.keys(additionalMetrics.cacheAccess ?? []).length > 0 && (
                <CacheMetrics cacheAccess={additionalMetrics.cacheAccess} />
            )}
            {Object.keys(additionalMetrics.messages ?? []).length > 0 && (
                <MessagesMetrics messages={additionalMetrics.messages} />
            )}
            {Object.keys(additionalMetrics.NodeAccessMetrics ?? []).length > 0 && (
                <NodeAccessMetrics metrics={additionalMetrics.NodeAccessMetrics} />
            )}
            {(additionalMetrics.searchQueries ?? []).length > 0 && (
                <SearchQueryMetrics searchQueries={additionalMetrics.searchQueries} />
            )}
            {Object.keys(additionalMetrics.debugMarkedPrototypes ?? []).length > 0 && (
                <DebugAttributeMetrics
                    records={additionalMetrics.debugMarkedPrototypes as DebugAttributeMetricEntry[]}
                />
            )}
        </Overlay>
    );
};

export default AdditionalMetricsOverlay;

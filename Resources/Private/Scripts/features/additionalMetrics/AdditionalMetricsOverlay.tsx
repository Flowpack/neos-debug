import { useComputed } from '@preact/signals';

import { useDebugContext } from '../../context/DebugContext';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import Table from '../../presentationals/Table';
import ContentContextMetrics from './ContentContextMetrics';
import MessagesMetrics from './MessagesMetrics';
import ResourceStreamRequestMetrics from './ResourceStreamRequestMetrics';
import ThumbnailGenerationMetrics from './ThumbnailGenerationMetrics';

import { css } from '../../styles/css';
import CacheMetrics from './CacheMetrics';

const detailsStyle = css`
    summary {
        cursor: pointer;
        padding: 5px 0;
    
        &:hover {
            color: var(--colors-PrimaryBlueHover);
        }
    }
`;

const getExecutionTimeColor = (ms: number): string => {
    if (ms > 200) return 'var(--colors-Error)';
    if (ms > 50) return 'var(--colors-Warn)';
    return 'var(--colors-Success)';
};

const shortClassName = (fqcn: string): string => fqcn.split('.').pop() ?? fqcn;

/**
 * Overlay to display additional metrics like resource stream requests and thumbnails.
 *
 * TODO: Make this overlay more generic and allow to render custom metrics.
 */
const AdditionalMetricsOverlay = () => {
    const visible = useComputed(() => overlayState.value === 'additionalMetrics');
    const {
        debugInfos: { resourceStreamRequests, thumbnails, additionalMetrics }
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
            {Object.keys(additionalMetrics.contentContextMetrics ?? []).length > 0 && (
                <ContentContextMetrics metrics={additionalMetrics.contentContextMetrics} />
            )}
            {(additionalMetrics.searchQueries ?? []).length > 0 && (
                <details className={detailsStyle}>
                    <summary>
                        Search queries ({additionalMetrics.searchQueries.length}) —{' '}
                        {additionalMetrics.searchQueries.reduce((sum, q) => sum + q.executionTime, 0).toFixed(2)}ms
                        total
                    </summary>
                    <Table>
                        <thead>
                            <tr>
                                <th>Implementation</th>
                                <th>Execution time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {additionalMetrics.searchQueries.map((query, index) => (
                                <tr key={index}>
                                    <td title={query.className}>{shortClassName(query.className)}</td>
                                    <td style={{ color: getExecutionTimeColor(query.executionTime) }}>
                                        {query.executionTime.toFixed(2)}ms
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </details>
            )}
        </Overlay>
    );
};

export default AdditionalMetricsOverlay;

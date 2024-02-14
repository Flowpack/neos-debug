import { useComputed } from '@preact/signals';

import { useDebugContext } from '../../context/DebugContext';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import Table from '../../presentationals/Table';
import Notice from '../../presentationals/Notice';

const AdditionalMetricsOverlay = () => {
    const visible = useComputed(() => overlayState.value === 'additionalMetrics');
    const {
        debugInfos: { resourceStreamRequests, thumbnails, additionalMetrics },
    } = useDebugContext();

    if (!visible.value) return null;

    return (
        <Overlay title="Other metrics">
            <h2>Resource stream requests ({Object.keys(resourceStreamRequests).length})</h2>
            <Notice>
                These requests show how many persistent resources are loaded during rendering to read their contents.
            </Notice>
            <Table>
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>SHA1</th>
                        <th>Collection</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(resourceStreamRequests).map((resource, index) => (
                        <tr key={index}>
                            <td>{resource.filename}</td>
                            <td>{resource.sha1}</td>
                            <td>{resource.collectionName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <hr />
            <h2>Generated thumbnails ({Object.keys(thumbnails).length})</h2>
            <Table>
                <thead>
                    <tr>
                        <th>SHA1</th>
                        <th>Usages</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(thumbnails).map((sha1, index) => (
                        <tr key={index}>
                            <td>{sha1}</td>
                            <td>{thumbnails[sha1]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {Object.keys(additionalMetrics.cacheAccess ?? []).length > 0 && (
                <>
                    <hr />
                    <h2>Cache access</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Cache identifier</th>
                                <th>Backend type</th>
                                <th>Hits</th>
                                <th>Misses</th>
                                <th>Sets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(additionalMetrics.cacheAccess)
                                .sort()
                                .map((cacheIdentifier: string) => (
                                    <tr>
                                        <td>{cacheIdentifier}</td>
                                        <td>{additionalMetrics.cacheAccess[cacheIdentifier].cacheType}</td>
                                        <td>{additionalMetrics.cacheAccess[cacheIdentifier].hits}</td>
                                        <td>{additionalMetrics.cacheAccess[cacheIdentifier].misses}</td>
                                        <td>{additionalMetrics.cacheAccess[cacheIdentifier].updates}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Overlay>
    );
};

export default AdditionalMetricsOverlay;

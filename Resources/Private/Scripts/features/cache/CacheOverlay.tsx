import { useComputed } from '@preact/signals';

import { useDebugContext } from '../../context/DebugContext';
import { css } from '../../styles/css';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import Table from '../../presentationals/Table';
import CacheTableEntry from './CacheTableEntry';

const headerStyle = css`
    display: flex;
    gap: 1rem;
`;

const cacheOverlayInnerStyle = css`
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 1rem;
    width: 100%;
    height: 100%;
`;

const CacheOverlay = () => {
    const visible = useComputed(() => overlayState.value === 'cache');
    const { debugInfos, cacheInfos } = useDebugContext();

    if (!visible.value) return null;

    return (
        <Overlay title="Fusion cache information">
            <div className={cacheOverlayInnerStyle}>
                <div className={headerStyle}>
                    <span>
                        <strong>Hits:</strong> {debugInfos.cCacheHits}
                    </span>
                    <span>
                        <strong>Misses:</strong> {debugInfos.cCacheMisses.length}
                    </span>
                    <span>
                        <strong>Uncached:</strong> {debugInfos.cCacheUncached}
                    </span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: 'fit-content' }}>Mode</th>
                            <th style={{ width: 'min-content', whiteSpace: 'nowrap' }}>Cache hit</th>
                            <th style={{ width: '100%' }}>Fusion path</th>
                            <th style={{ width: 'min-content' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cacheInfos.map((cacheInfo) => (
                            <CacheTableEntry cacheInfo={cacheInfo} key={cacheInfo.fusionPath} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </Overlay>
    );
};

export default CacheOverlay;

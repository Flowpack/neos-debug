import { useComputed } from '@preact/signals';
import { useState } from 'preact/hooks';

import { useDebugContext } from '../../context/DebugContext';
import { css } from '../../styles/css';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import Table from '../../presentationals/Table';
import { Icon, iconCaretDown } from '../../presentationals/Icon';
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

const sortableHeaderStyle = css`
    cursor: pointer;
    user-select: none;
    white-space: nowrap;

    &:hover {
        color: var(--colors-PrimaryBlue);
    }
`;

const caretStyle = css`
    display: inline-flex;
    margin-left: 1ch;
    vertical-align: text-top;
    
    svg {
        height: 100%;
        width: auto;
        display: block;
    }
`;

type SortColumn = 'mode' | 'hit' | 'renderTime' | 'sqlQueryCount' | 'fusionPath';
type SortDirection = 'asc' | 'desc';

const CacheOverlay = () => {
    const visible = useComputed(() => overlayState.value === 'cache');
    const { debugInfos, cacheInfos } = useDebugContext();
    const [sortColumn, setSortColumn] = useState<SortColumn>('fusionPath');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedCacheInfos = [...cacheInfos].sort((a, b) => {
        let comparison = 0;

        switch (sortColumn) {
            case 'mode':
                comparison = a.mode.localeCompare(b.mode);
                break;
            case 'hit':
                comparison = (a.hit ? 1 : 0) - (b.hit ? 1 : 0);
                break;
            case 'renderTime':
                comparison =
                    parseFloat(a.renderMetrics?.renderTime ?? '0') -
                    parseFloat(b.renderMetrics?.renderTime ?? '0');
                break;
            case 'sqlQueryCount':
                comparison =
                    (a.renderMetrics?.sqlQueryCount ?? 0) - (b.renderMetrics?.sqlQueryCount ?? 0);
                break;
            case 'fusionPath':
                comparison = a.fusionPath.localeCompare(b.fusionPath);
                break;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
    });

    if (!visible.value) return null;

    const renderSortIcon = (column: SortColumn) => {
        if (sortColumn !== column) return null;
        return (
            <span
                className={caretStyle}
                style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : undefined }}
            >
                <Icon icon={iconCaretDown} size="S" />
            </span>
        );
    };

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
                            <th
                                className={sortableHeaderStyle}
                                onClick={() => handleSort('mode')}
                                style={{ width: 'fit-content' }}
                            >
                                Mode{renderSortIcon('mode')}
                            </th>
                            <th
                                className={sortableHeaderStyle}
                                onClick={() => handleSort('hit')}
                                style={{ width: 'min-content', whiteSpace: 'nowrap' }}
                            >
                                Cache hit{renderSortIcon('hit')}
                            </th>
                            <th
                                className={sortableHeaderStyle}
                                onClick={() => handleSort('renderTime')}
                                style={{ width: 'min-content', whiteSpace: 'nowrap' }}
                            >
                                Render time{renderSortIcon('renderTime')}
                            </th>
                            <th
                                className={sortableHeaderStyle}
                                onClick={() => handleSort('sqlQueryCount')}
                                style={{ width: 'min-content', whiteSpace: 'nowrap' }}
                            >
                                SQL queries{renderSortIcon('sqlQueryCount')}
                            </th>
                            <th
                                className={sortableHeaderStyle}
                                onClick={() => handleSort('fusionPath')}
                                style={{ width: '100%' }}
                            >
                                Fusion path{renderSortIcon('fusionPath')}
                            </th>
                            <th style={{ width: 'min-content' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCacheInfos.map((cacheInfo) => (
                            <CacheTableEntry cacheInfo={cacheInfo} key={cacheInfo.fusionPath} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </Overlay>
    );
};

export default CacheOverlay;

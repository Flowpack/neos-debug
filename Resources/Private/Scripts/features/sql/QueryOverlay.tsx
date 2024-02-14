import { useComputed } from '@preact/signals';

import { useDebugContext } from '../../context/DebugContext';
import QueryTable from './QueryTable';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import Notice from '../../presentationals/Notice';

const QueryOverlay = () => {
    const visible = useComputed(() => overlayState.value === 'query');
    const {
        debugInfos: { sqlData },
    } = useDebugContext();

    if (!visible.value) return null;

    return (
        <Overlay title="Database query information">
            <Notice>
                <strong>{sqlData.queryCount}</strong> queries with <strong>{sqlData.executionTime.toFixed(2)}ms</strong>{' '}
                execution time.
            </Notice>
            <QueryTable />
        </Overlay>
    );
};

export default QueryOverlay;

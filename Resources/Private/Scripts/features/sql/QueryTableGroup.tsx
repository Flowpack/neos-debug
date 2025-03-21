import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

import { css } from '../../styles/css';
import QueryTableRow from './QueryTableRow';

const tableNameStyle = css`
    cursor: pointer;
    
    &:hover {
        background-color: var(--colors-ContrastNeutral);
    }
        
    td {
        color: var(--colors-PrimaryBlue);
        
        &:not(:first-child) {
            text-align: right;
        }
    }
`;

interface QueryTableGroupProps {
    tableName: string;
    queries: Record<string, QueryDetails>;
}

const QueryTableGroup: FunctionComponent<QueryTableGroupProps> = ({ tableName, queries }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <tr className={tableNameStyle} onClick={() => setCollapsed((prev) => !prev)}>
                <td>
                    {collapsed ? '▶' : '▼'} <strong>{tableName}</strong>
                </td>
                <td>{Object.values(queries).reduce((acc, details) => acc + details.executionTimeSum, 0).toFixed(2)} ms</td>
                <td>{Object.values(queries).reduce((acc, details) => acc + details.count, 0)}</td>
            </tr>
            {!collapsed && Object.keys(queries).map((sqlString) => (
                <QueryTableRow
                    queryString={sqlString}
                    queryDetails={queries[sqlString]}
                />
            ))}
        </>
    );
};

export default QueryTableGroup;

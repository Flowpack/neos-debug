import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

import { css } from "../../styles/css";
import QueryTableRow from "./QueryTableRow";

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
    queryGroup: QueryGroup;
}

const QueryTableGroup: FunctionComponent<QueryTableGroupProps> = ({ tableName, queryGroup }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <tr className={tableNameStyle} onClick={() => setCollapsed((prev) => !prev)}>
                <td>
                    {collapsed ? "▶" : "▼"} <strong>{tableName}</strong>
                </td>
                <td>{queryGroup.executionTimeSum.toFixed(2)} ms</td>
                <td>{queryGroup.count}</td>
            </tr>
            {!collapsed && Object.keys(queryGroup.queries)
                .sort((a, b) => {
                    // Sort descending by execution time
                    return queryGroup.queries[b].executionTimeSum - queryGroup.queries[a].executionTimeSum;
                }).map((sqlString) => (
                    <QueryTableRow
                        queryString={sqlString}
                        queryDetails={queryGroup.queries[sqlString]}
                    />
                ))}
        </>
    );
};

export default QueryTableGroup;

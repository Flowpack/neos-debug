import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

import { css } from "../../styles/css";
import QueryTableRow from "./QueryTableRow";
import { classnames } from "../../helper/classnames";
import {Icon, iconWarning} from "../../presentationals/Icon";

const tableRowStyle = css`
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

const slowQueryStyle = css`
    svg {
        color: var(--colors-Warn);
    }
`;

const tableNameStyle = css`
    display: inline-flex;
    gap: 1ch;
`;

interface QueryTableGroupProps {
    tableName: string;
    queryGroup: QueryGroup;
    slowQueries: SlowQuery[];
}

const QueryTableGroup: FunctionComponent<QueryTableGroupProps> = ({ tableName, queryGroup, slowQueries }) => {
    const [collapsed, setCollapsed] = useState(true);

    const slowQueriesForTable = slowQueries.filter((slowQuery) => slowQuery.table === tableName);

    return (
        <>
            <tr className={classnames(tableRowStyle, slowQueriesForTable.length > 0 && slowQueryStyle)} onClick={() => setCollapsed((prev) => !prev)}>
                <td>
                    <span className={tableNameStyle}>
                        {collapsed ? "▶" : "▼"}
                        {slowQueriesForTable.length > 0 && <Icon icon={iconWarning}/>}
                        <strong>{tableName}</strong>
                    </span>
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
                        slowQueries={slowQueriesForTable.filter(({sql}) => sql === sqlString)}
                    />
                ))}
        </>
    );
};

export default QueryTableGroup;

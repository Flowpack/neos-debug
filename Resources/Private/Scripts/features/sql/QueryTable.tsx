import { FunctionComponent } from "preact";

import { useDebugContext } from "../../context/DebugContext";
import QueryTableGroup from "./QueryTableGroup";
import { css } from "../../styles/css";

const styles = css`
    width: 100%;
    margin-bottom: 4rem;
    table-layout: fixed;
    border-collapse: collapse;

    th {
        font-weight: bold;
        font-size: 16px;
        padding: 1rem 0.5rem;
        width: 100px;
        textAlign: right;
        
        &:first-child {
            text-align: left;
            width: auto;
        }
    }

    tr {
        font-size: 13px;
        margin-bottom: 0.5rem;

        &:last-child {
            border-bottom: none;
        }
    }

    td {
        padding: 0.5rem;
        border-bottom: 1px solid var(--colors-ContrastDark);
        vertical-align: top;
    }
`;

const QueryTable: FunctionComponent = () => {
    const {
        debugInfos: {
            sqlData: { groupedQueries }
        }
    } = useDebugContext();

    return (
        <table className={styles}>
            <thead>
                <tr>
                    <th>Query</th>
                    <th>Total time</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedQueries)
                    .sort((a, b) => {
                        // Sort descending by execution time
                        return groupedQueries[b].executionTimeSum - groupedQueries[a].executionTimeSum;
                    })
                    .map((tableName) => (
                        <QueryTableGroup tableName={tableName} queryGroup={groupedQueries[tableName]} />
                    ))}
            </tbody>
        </table>
    );
};

export default QueryTable;

import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

import { css } from '../../styles/css';
import {classnames} from "../../helper/classnames";
import {Icon, iconWarning} from "../../presentationals/Icon";

interface QueryTableRowProps {
    queryString: string;
    queryDetails: QueryDetails;
    slowQueries: SlowQuery[];
}

const queryTableRowStyle = css`
    ul {
        margin: 0;
    }

    td {
        &:first-child {
            padding-left: 1rem !important;
        }
        
        &:not(:first-child) {
            text-align: right;
        }
    }
`;

const sqlStringStyle = css`
    display: inline-flex;
    vertical-align: middle;
    max-width: calc(100% - 30px);
    gap: 1ch;
    
    i {
        font-style: normal;
        cursor: pointer;
        
        &:hover {
            color: var(--colors-PrimaryBlueHover);
        }
    }
`;

const collapsedStyle = css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const slowQueryStyle = css`
    svg {
        color: var(--colors-Warn);
    }
`;

const parameterTableRowStyle = css`
    td {
        text-align: end;
        
        &:first-child {
            text-align: start;
            padding-left: 2rem !important;
            overflow-wrap: anywhere;
        }
    }
    
    svg {
        color: var(--colors-Warn);
    }
`;

const QueryTableRow: FunctionComponent<QueryTableRowProps> = ({ queryString, queryDetails, slowQueries }) => {
    const [collapsed, setCollapsed] = useState(true);
    const hasSlowQuery = slowQueries.length > 0;

    return (
        <>
            <tr className={queryTableRowStyle}>
                <td title="Toggle details">
                    <span
                        className={classnames(sqlStringStyle, collapsed && collapsedStyle, hasSlowQuery && slowQueryStyle)}
                        title={queryString}
                    >
                        <i onClick={() => setCollapsed((prev) => !prev)}>{collapsed ? '▶' : '▼'}</i>
                        {hasSlowQuery && <Icon icon={iconWarning}/>}
                        <span>{queryString}</span>
                    </span>
                </td>
                <td>{queryDetails.executionTimeSum.toFixed(2)} ms</td>
                <td>{queryDetails.count}</td>
            </tr>
            {!collapsed && (
                <>
                    <tr classNames={parameterTableRowStyle}>
                        <td colSpan={2}>Calls by parameters</td>
                        <td>Count</td>
                    </tr>
                    {Object.keys(queryDetails.params)
                        .sort((a, b) => queryDetails.params[b] - queryDetails.params[a])
                        .map((paramString) => {
                        const isSlow = slowQueries.find(({params}) => JSON.stringify(params) === paramString);
                        return (
                            <tr
                                className={parameterTableRowStyle}
                                key={paramString}
                            >
                                <td colSpan={2}>{isSlow && <Icon icon={iconWarning}/>} {paramString}</td>
                                <td>{queryDetails.params[paramString]}</td>
                            </tr>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default QueryTableRow;

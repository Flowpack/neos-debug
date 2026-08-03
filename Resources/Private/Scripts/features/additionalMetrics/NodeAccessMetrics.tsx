import { Table, FormattedValue, Details, Notice } from '../../presentationals';

import { css } from '../../styles/css';

const identifierColumnStyle = css`
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type NodeAccessMetricsProps = {
    metrics: Record<
        string,
        {
            workspace: string;
            dimensions: Record<string, string[]>;
            invisibleContentShown: boolean;
            removedContentShown: boolean;
            inaccessibleContentShown: boolean;
            firstLevelNodeCache: {
                nodesByPath: number;
                nodesByIdentifier: number;
                childNodesByPathAndNodeTypeFilter: number;
            };
        }
    >;
};

/**
 * Convert a string like `inaccessibleContentShown` to a better readable `Inaccessible Content Shown`
 */
const formatHeadline = (text: string) => {
    const spaced = text.replace(/([A-Z])/g, ' $1').trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const NodeAccessMetrics = ({ metrics }: NodeAccessMetricsProps) => {
    const nodeCount = Object.values(metrics).reduce((carry, context) => {
        carry += Math.max(
            context.firstLevelNodeCache.nodesByPath,
            context.firstLevelNodeCache.nodesByIdentifier,
            context.firstLevelNodeCache.childNodesByPathAndNodeTypeFilter,
        );
        return carry;
    }, 0);

    return (
        <Details summary={`Node access metrics (~${nodeCount} loaded nodes)`}>
            <Notice>
                These are nodes loaded from the Content Repository and stored in the first level node cache. The total
                number might include duplicates and doesn't necessarily correlate with the number of database queries.
            </Notice>
            <Table>
                <thead>
                    <tr>
                        <th>Identifier</th>
                        {Object.keys(Object.values(metrics)[0]).map((key) => (
                            <th key={key}>{formatHeadline(key)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(metrics).map((contextIdentifier: string) => (
                        <tr>
                            <td class={identifierColumnStyle}>{contextIdentifier}</td>
                            {Object.keys(metrics[contextIdentifier]).map((key) => (
                                <td key={key}>
                                    <FormattedValue value={metrics[contextIdentifier][key]} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Details>
    );
};

export default NodeAccessMetrics;

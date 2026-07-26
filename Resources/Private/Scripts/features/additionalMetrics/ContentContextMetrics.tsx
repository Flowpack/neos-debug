import Table from '../../presentationals/Table';
import FormattedValue from '../../presentationals/FormattedValue';

import { css } from '../../styles/css';

type ContentContextMetricsProps = {
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

const detailsStyle = css`
    summary {
        cursor: pointer;
        padding: 5px 0;

        &:hover {
            color: var(--colors-PrimaryBlueHover);
        }
    }
`;

const ContentContextMetrics = ({ metrics }: ContentContextMetricsProps) => {
    const nodeCount = Object.values(metrics).reduce((carry, context) => {
        carry += context.firstLevelNodeCache.nodesByIdentifier;
        return carry;
    }, 0);

    return (
        <details className={detailsStyle}>
            <summary>Content context metrics ({nodeCount} loaded nodes)</summary>
            <Table>
                <thead>
                    <tr>
                        <th>Identifier</th>
                        {Object.keys(Object.values(metrics)[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(metrics).map((contextIdentifier: string) => (
                        <tr>
                            <td>{contextIdentifier}</td>
                            {Object.keys(metrics[contextIdentifier]).map((key) => (
                                <td key={key}>
                                    <FormattedValue value={metrics[contextIdentifier][key]} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </details>
    );
};

export default ContentContextMetrics;

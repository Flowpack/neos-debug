import Table from '../../presentationals/Table';

import { css } from '../../styles/css';

type MessagesMetricsProps = {
    messages: {
        timestamp: string;
        title: string;
        message: string;
    }[];
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

const MessagesMetrics = ({messages}: MessagesMetricsProps) => {
    return (
        <details className={detailsStyle}>
            <summary>Messages ({messages.length})</summary>
            <Table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Title</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(messages).map(({ timestamp, title, message }, i) => (
                        <tr key={i}>
                            <td>{timestamp}</td>
                            <td>{title}</td>
                            <td>{message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </details>
    );
}

export default MessagesMetrics;

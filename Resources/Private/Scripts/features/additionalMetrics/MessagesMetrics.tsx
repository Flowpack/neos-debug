import { Table, Details } from '../../presentationals';

type MessagesMetricsProps = {
    messages: {
        timestamp: string;
        title: string;
        message: string;
    }[];
};

const MessagesMetrics = ({messages}: MessagesMetricsProps) => {
    return (
        <Details summary={`Messages (${messages.length})`}>
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
        </Details>
    );
}

export default MessagesMetrics;

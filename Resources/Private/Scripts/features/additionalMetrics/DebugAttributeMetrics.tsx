import { Table, Details } from '../../presentationals';

const getTimeColor = (ms: number): string => {
    if (ms > 200) return 'var(--colors-Error)';
    if (ms > 50) return 'var(--colors-Warn)';
    return 'var(--colors-Success)';
};

type DebugAttributeMetricsProps = {
    records: DebugAttributeMetricEntry[];
};

const DebugAttributeMetrics = ({ records }: DebugAttributeMetricsProps) => {
    const totalCount = records.reduce((sum, r) => sum + r.count, 0);

    return (
        <Details summary={`Debug-marked prototypes (${totalCount} evaluations)`}>
            <Table>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Fusion Object</th>
                        <th>Count</th>
                        <th>Total</th>
                        <th>Avg</th>
                        <th>Min</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td title={record.fusionPath}>{record.label}</td>
                            <td>{record.fusionObjectName}</td>
                            <td>{record.count}</td>
                            <td style={{ color: getTimeColor(record.totalTime) }}>
                                {record.totalTime}ms
                            </td>
                            <td style={{ color: getTimeColor(record.avgTime) }}>
                                {record.avgTime}ms
                            </td>
                            <td>{record.minTime}ms</td>
                            <td style={{ color: getTimeColor(record.maxTime) }}>
                                {record.maxTime}ms
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Details>
    );
};

export default DebugAttributeMetrics;

import { Table, Details } from '../../presentationals';

const getExecutionTimeColor = (ms: number): string => {
    if (ms > 200) return 'var(--colors-Error)';
    if (ms > 50) return 'var(--colors-Warn)';
    return 'var(--colors-Success)';
};

const shortClassName = (fqcn: string): string => fqcn.split('.').pop() ?? fqcn;

type SearchQueryMetricsProps = {
    searchQueries: SearchQuery[];
};

const SearchQueryMetrics = ({searchQueries}: SearchQueryMetricsProps) => {
    const totalExecutionTime = searchQueries.reduce((sum, q) => sum + q.executionTime, 0).toFixed(2);

    return (
        <Details summary={`Search queries (${searchQueries.length}) — ${totalExecutionTime}ms total`}>
            <Table>
                <thead>
                    <tr>
                        <th>Implementation</th>
                        <th>Execution time</th>
                    </tr>
                </thead>
                <tbody>
                    {searchQueries.map((query, index) => (
                        <tr key={index}>
                            <td title={query.className}>{shortClassName(query.className)}</td>
                            <td style={{ color: getExecutionTimeColor(query.executionTime) }}>
                                {query.executionTime.toFixed(2)}ms
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Details>
    );
}

export default SearchQueryMetrics;

import { Table, Details } from '../../presentationals';

type CacheMetricsProps = {
    cacheAccess: CacheAccessMetrics;
};

const CacheMetrics = ({ cacheAccess }: CacheMetricsProps) => {
    return (
        <Details summary={`Cache access`}>
            <Table>
                <thead>
                    <tr>
                        <th>Cache identifier</th>
                        <th>Backend type</th>
                        <th>Hits</th>
                        <th>Misses</th>
                        <th>Sets</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(cacheAccess)
                        .sort()
                        .map((cacheIdentifier: string) => (
                            <tr>
                                <td>{cacheIdentifier}</td>
                                <td>{cacheAccess[cacheIdentifier].cacheType}</td>
                                <td>{cacheAccess[cacheIdentifier].hits}</td>
                                <td>{cacheAccess[cacheIdentifier].misses}</td>
                                <td>{cacheAccess[cacheIdentifier].updates}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Details>
    );
};

export default CacheMetrics;

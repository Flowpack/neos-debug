import { Table, Details } from '../../presentationals';

type CacheMetricsProps = {
    cacheAccess: CacheAccessMetrics;
};

const CacheMetrics = ({ cacheAccess }: CacheMetricsProps) => {
    const totalHits = Object.values(cacheAccess).reduce((carry, cache) => carry + cache.hits, 0);
    const totalMisses = Object.values(cacheAccess).reduce((carry, cache) => carry + cache.misses, 0);
    const totalSets = Object.values(cacheAccess).reduce((carry, cache) => carry + cache.updates, 0);

    return (
        <Details summary={`Cache access (${totalHits} hits, ${totalMisses} misses, ${totalSets} sets)`}>
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

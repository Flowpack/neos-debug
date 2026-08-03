import { Table, Notice, Details } from '../../presentationals';

type ResourceStreamRequestMetricsProps = {
    resourceStreamRequests: NeosResource[];
};

const ResourceStreamRequestMetrics = ({ resourceStreamRequests }: ResourceStreamRequestMetricsProps) => {
    return (
        <Details summary={`Resource stream requests (${Object.keys(resourceStreamRequests).length})`}>
            <Notice>
                These requests show how many persistent resources are loaded during rendering to read their contents.
            </Notice>
            {Object.values(resourceStreamRequests).length > 0 && (
                <Table>
                    <thead>
                        <tr>
                            <th>Filename</th>
                            <th>SHA1</th>
                            <th>Collection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(resourceStreamRequests).map((resource, index) => (
                            <tr key={index}>
                                <td>{resource.filename}</td>
                                <td>{resource.sha1}</td>
                                <td>{resource.collectionName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Details>
    );
};

export default ResourceStreamRequestMetrics;

import { Table, Details } from '../../presentationals';

type ThumbnailGenerationMetricsProps = {
    thumbnails: ThumbnailMetrics;
};

const ThumbnailGenerationMetrics = ({ thumbnails }: ThumbnailGenerationMetricsProps) => {
    return (
        <Details summary={`Generated thumbnails (${Object.keys(thumbnails).length})`}>
            {Object.keys(thumbnails).length > 0 && (
                <Table>
                    <thead>
                        <tr>
                            <th>SHA1</th>
                            <th>Usages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(thumbnails).map((sha1, index) => (
                            <tr key={index}>
                                <td>{sha1}</td>
                                <td>{thumbnails[sha1].join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Details>
    );
};

export default ThumbnailGenerationMetrics;

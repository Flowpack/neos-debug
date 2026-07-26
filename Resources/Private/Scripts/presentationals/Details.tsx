import { ComponentChildren } from 'preact';

import { css } from '../styles/css';

const detailsStyle = css`
    summary {
        cursor: pointer;
        padding: 5px 0;
    
        &:hover {
            color: var(--colors-PrimaryBlueHover);
        }
    }
`;

type DetailsProps = {
    summary: string;
    children: ComponentChildren;
};

const Details = ({summary, children}: DetailsProps) => {
    return (
        <details className={detailsStyle}>
            <summary>{summary}</summary>
            {children}
        </details>
    );
}

export default Details;

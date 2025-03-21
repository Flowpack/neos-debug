import { ComponentChildren, FunctionComponent } from 'preact';
import { css } from '../styles/css';

const tableWrapperStyle = css`
    overflow-y: auto;
    width: 100%;
`;

const tableStyle = css`
    border-collapse: collapse;
    width: 100%;

    th {
        text-align: left;
        padding: 0.5rem;
        word-break: break-word;
        /* This regex-like pattern helps break at uppercase letters in camelCase */
        overflow-wrap: break-word;
        hyphens: auto;
        position: sticky;
        top: 0;
        background-color: var(--colors-ContrastDarker);
    }

    td {
        border: 1px solid var(--colors-ContrastDark);
        vertical-align: baseline;
        padding: 0.5rem;
    }
`;

const Table: FunctionComponent<{ children: ComponentChildren }> = ({ children }) => {
    return (
        <div className={tableWrapperStyle}>
            <table className={tableStyle}>{children}</table>
        </div>
    );
};

export default Table;

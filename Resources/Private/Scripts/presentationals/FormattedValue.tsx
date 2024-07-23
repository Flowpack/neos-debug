import { FunctionComponent, h } from 'preact';
import { formatValue } from '../helper/formatValues';
import { css } from '../styles/css';

const valueStyle = css`
    overflow: auto;
    margin: 0;

    .string {
        color: var(--colors-Success);
        white-space: normal;
    }
    .number {
        color: var(--colors-Warn);
    }
    .boolean {
        color: var(--colors-PrimaryBlue);
    }
    .null {
        color: var(--colors-ContrastBright);
    }
    .key {
        color: var(--colors-Error);
    }
`;

const FormattedValue: FunctionComponent<{ value: any }> = ({ value }) => {
    return <pre class={valueStyle} dangerouslySetInnerHTML={{ __html: formatValue(value) }} />;
};

export default FormattedValue;

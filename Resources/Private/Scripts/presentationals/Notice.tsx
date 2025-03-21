import { Icon, iconInfo } from './Icon';
import { ComponentChildren, FunctionComponent } from 'preact';
import { css } from '../styles/css';

const noticeStyle = css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    
    span {
        display: inline-flex;
    }

    svg {
        color: var(--colors-PrimaryBlue);
    }
`;

const Notice: FunctionComponent<{ children: ComponentChildren; title?: string }> = ({ children, title = null }) => {
    return (
        <div className={noticeStyle}>
            <Icon icon={iconInfo} />
            <div className="notice__content">
                {title && <strong>{title}</strong>}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Notice;

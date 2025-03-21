import { ComponentChildren, FunctionComponent, h } from 'preact';

import { css } from '../styles/css';
import { Icon, iconXMark } from './Icon';
import { useCallback, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';

const styles = css`
    align-items: flex-start;
    background-color: var(--colors-ContrastDarker);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    color: var(--colors-ContrastBrightest);
    font-size: 12px;
    left: 1rem;
    position: fixed;
    right: 1rem;
    top: 1rem;
    max-width: 1280px;
    margin: 0 auto;
    z-index: 10002;
    display: grid;
    grid-template-rows: auto 1fr;
    max-height: calc(100vh - 6rem);
    overflow: hidden;

    h1 {
        margin: 0;
        font-size: 1.4em;
        position: sticky;
        top: 0;
        padding: 0.5rem 0;
        text-align: center;
        width: 100%;
        z-index: 1;
        background-color: var(--colors-PrimaryViolet);
        color: var(--colors-ContrastBrightest);
    }

    h2 {
        margin: 0;
        font-size: 1.2em;
    }
`;

const closeButtonStyle = css`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    padding: 1rem;
    background-color: transparent !important;
    color: white;
    z-index: 1;
`;

const contentWrapStyle = css`
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    max-height: calc(100% - 50px);
`;

const overlayState = signal<Overlays | null>(null);

type OverlayProps = {
    title?: string;
    children: ComponentChildren;
    onClose?: () => void;
    resetOverlay?: boolean;
};

const Overlay: FunctionComponent<OverlayProps> = ({ title = null, children, onClose, resetOverlay = true }) => {
    const closeOverlay = useCallback(() => {
        if (resetOverlay) {
            overlayState.value = null;
        }
        onClose && onClose();
    }, []);

    // Close on escape
    useEffect(() => {
        const escapeEvent = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeOverlay();
            }
        };

        window.addEventListener('keydown', escapeEvent);

        return () => {
            window.removeEventListener('keydown', escapeEvent);
        };
    });

    return (
        <div className={styles}>
            {title && <h1>{title}</h1>}
            <button type="button" className={closeButtonStyle} onClick={closeOverlay}>
                <Icon icon={iconXMark} />
            </button>
            <div className={contentWrapStyle}>{children}</div>
        </div>
    );
};

export { overlayState, Overlay };
export default Overlay;

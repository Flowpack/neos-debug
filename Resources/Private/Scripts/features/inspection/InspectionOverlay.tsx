import { FunctionComponent, Fragment } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import { useComputed } from '@preact/signals';

import { useDebugContext } from '../../context/DebugContext';
import InspectionElement from './InspectionElement';
import { css } from '../../styles/css';
import Overlay, { overlayState } from '../../presentationals/Overlay';
import FormattedValue from '../../presentationals/FormattedValue';

let observer = null;

const tableStyles = css`
    max-width: 90vw;
    overflow: auto;
    background-color: var(--colors-ContrastDarker);
    color: var(--colors-ContrastBrightest);
    pointer-events: all;

    td {
        vertical-align: text-bottom;

        &:first-child {
            font-weight: bold;
        }
    }
`;

const InspectionOverlay: FunctionComponent = () => {
    const visible = useComputed(() => overlayState.value === 'inspection');
    const { cacheInfos } = useDebugContext();
    const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});
    const [activeElement, setActiveElement] = useState<CacheInfo>(null);

    const checkElementVisibility = useCallback((entries) => {
        entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.neosDebugId;
            visibleElements[id] = entry.isIntersecting;
        });
        setVisibleElements({ ...visibleElements });
    }, []);

    useEffect(() => {
        if (!observer) {
            observer = new IntersectionObserver(checkElementVisibility, {
                threshold: 0.1,
                rootMargin: '0px',
            });
        }

        if (visible) {
            cacheInfos.forEach((cacheInfo) => observer.observe(cacheInfo.parentNode));
        } else {
            cacheInfos.forEach((cacheInfo) => observer.unobserve(cacheInfo.parentNode));
        }

        return () => {
            if (observer) {
                cacheInfos.forEach((cacheInfo) => observer.unobserve(cacheInfo.parentNode));
            }
        };
    }, [visible.value]);

    if (!visible.value) return null;

    return (
        <Fragment>
            {cacheInfos
                .filter((cacheInfo) => visibleElements[cacheInfo.fusionPath])
                .map((cacheInfo) => (
                    <InspectionElement
                        key={cacheInfo.fusionPath}
                        cacheInfo={cacheInfo}
                        setActiveElement={setActiveElement}
                    />
                ))}
            {activeElement && (
                <Overlay onClose={() => setActiveElement(null)} resetOverlay={false}>
                    <table className={tableStyles}>
                        <tbody>
                            {Object.keys(activeElement).map((key) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>
                                        <FormattedValue value={activeElement[key]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Overlay>
            )}
        </Fragment>
    );
};

export default InspectionOverlay;

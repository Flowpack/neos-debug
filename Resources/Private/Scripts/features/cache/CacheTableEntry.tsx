import { FunctionComponent, h } from 'preact';

import { css } from '../../styles/css';
import { useState } from 'preact/hooks';
import { formatValue, ucFirst } from '../../helper/formatValues';
import { Icon, iconInfo, iconToggleOff, iconToggleOn } from '../../presentationals/Icon';

const rowStyle = css`
    --color-positive: var(--colors-Success);
    --color-negative: var(--colors-Warn);
    --color-neutral: var(--colors-ContrastBright);
`;

const highlightPositive = css`
    border-left: 5px solid var(--color-positive) !important;
`;

const highlightNeutral = css`
    background-color: var(--color-neutral) !important;
`;

const highlightNegative = css`
    background-color: var(--color-negative) !important;
`;

const fusionPathStyle = css`
    word-break: break-word;
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.3em;
    line-height: 1.4;

    i {
        color: var(--colors-ContrastBright);
    }

    .fragment {
        color: var(--colors-ContrastBrighter);
    }

    .prototype {
        display: none;
        font-weight: bold;
        color: var(--colors-PrimaryBlue);
    }

    &[data-show-prototypes='true'] .prototype {
        display: inline-block;
    }
`;

const actionsStyle = css`
    display: flex;
    gap: 0.5rem;
`;

const valueStyle = css`
    display: grid;

    pre {
        overflow: auto;
        margin: 0;
    }
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

type CacheTableEntryProps = {
    cacheInfo: CacheInfo;
};

const IGNORED_DETAIL_KEYS = ['mode', 'hit', 'fusionPath'];

const CacheTableEntry: FunctionComponent<CacheTableEntryProps> = ({ cacheInfo }) => {
    const [showPrototypes, setShowPrototypes] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const regex = /([^<>/]+)<([^<>:/]+:[^<>:/]+)(?::(.*?))?>(?:\/|$)/g;

    const formattedString = cacheInfo.fusionPath.replace(
        regex,
        '<span class="fragment">$1</span><span class="prototype">&lt;$2$3&gt;</span><i>/</i>',
    );

    const modeStyle =
        cacheInfo.mode == 'cached'
            ? highlightPositive
            : cacheInfo.mode == 'dynamic'
              ? highlightNeutral
              : highlightNegative;

    const cacheHitStyle = cacheInfo.hit ? highlightPositive : highlightNegative;

    return (
        <>
            <tr className={rowStyle} data-cache-hit={cacheInfo.hit}>
                <td className={modeStyle}>{ucFirst(cacheInfo.mode)}</td>
                <td className={cacheHitStyle}>{cacheInfo.hit ? 'Yes' : 'No'}</td>
                <td>
                    <div
                        className={fusionPathStyle}
                        data-show-prototypes={showPrototypes}
                        dangerouslySetInnerHTML={{ __html: formattedString }}
                    />
                </td>
                <td>
                    <div className={actionsStyle}>
                        <button
                            type="button"
                            onClick={() => setShowPrototypes((prev) => !prev)}
                            title="Toggle prototypes"
                        >
                            <Icon icon={showPrototypes ? iconToggleOn : iconToggleOff} />
                        </button>
                        <button type="button" onClick={() => setShowDetails((prev) => !prev)} title="Show details">
                            <Icon icon={iconInfo} />
                        </button>
                    </div>
                </td>
            </tr>
            {showDetails &&
                Object.keys(cacheInfo)
                    .filter((key) => !IGNORED_DETAIL_KEYS.includes(key))
                    .map((key) => (
                        <tr key={key} className={rowStyle}>
                            <td colSpan={2}>{ucFirst(key)}</td>
                            <td colSpan={2}>
                                <div className={valueStyle}>
                                    <pre dangerouslySetInnerHTML={{ __html: formatValue(cacheInfo[key]) }} />
                                </div>
                            </td>
                        </tr>
                    ))}
        </>
    );
};

export default CacheTableEntry;

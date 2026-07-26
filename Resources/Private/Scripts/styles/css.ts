import createEmotion from '@emotion/css/create-instance';

const styleContainer = document.createElement('div');

const emotionInstance = createEmotion({ key: 'neos-debug', container: styleContainer });
// Speeds need to be disabled when used with custom elements
emotionInstance.sheet.speedy(false);
const css = emotionInstance.css;

export { css, styleContainer };

import { range } from '../../utils';

// NOTE: This function has a side effect of inserting a <style> tag into
// the <head> of the current HTML page.
export const createAndInsertStylesheet = () => {
  const styleDOMNode = document.createElement('style');
  styleDOMNode.type = 'text/css';

  const head = document.querySelector('head');
  head.appendChild(styleDOMNode);

  return styleDOMNode;
};

// NOTE: this function is all side-effects, updating the <style> tag
// this component created.
export const addStyles = ({ stylesheet, selector, styles }) => {
  const rulesObj = stylesheet.cssRules || stylesheet.rules;

  const stylesString = Object.entries(styles)
    .map(([key, val]) => `${key}: ${val};`)
    .join(' ');

  const newRule = `${selector} { ${stylesString} }`;

  // For some reason, Firefox Quantum doesn't like the style strings I'm
  // generating. At some point I should figure this out properly, but for now
  // I'll just let Firefox Quantum have default scrollbars
  try {
    stylesheet.insertRule(newRule, rulesObj.length);
  } catch (e) {
    // Intentionally ignoring, since all this means is no scrollbar styling
    // support. I can live with that.
  }
};

// NOTE: this function is all side-effects, updating the <style> tag
// this component created.
export const clearStyles = stylesheet => {
  const rulesObj = stylesheet.cssRules || stylesheet.rules;

  range(rulesObj.length).forEach(() => {
    stylesheet.deleteRule(0);
  });
};

// Get the full selector name for a given style.
export const getSelectorForStyleName = styleName => {
  switch (styleName) {
    case 'scrollbarStyles':
      return 'body::-webkit-scrollbar';
    case 'scrollbarTrackStyles':
      return 'body::-webkit-scrollbar-track';
    case 'scrollbarThumbStyles':
      return 'body::-webkit-scrollbar-thumb';
    default:
      throw new Error(`Unrecognized rule ID "${styleName}" for Scrollbars.`);
  }
};

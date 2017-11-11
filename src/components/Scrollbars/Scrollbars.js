import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import {
  createAndInsertStylesheet,
  addStyles,
  clearStyles,
  getSelectorForStyleName,
} from './Scrollbars.helpers';

class Scrollbars extends PureComponent {
  static instanceCount = 0;
  static styleDOMNode = createAndInsertStylesheet();

  static propTypes = {
    scrollbarStyles: PropTypes.object,
    scrollbarTrackStyles: PropTypes.object,
    scrollbarThumbStyles: PropTypes.object,
  };

  componentDidMount() {
    Scrollbars.instanceCount++;

    // Check for environment, to avoid showing invariant warnings in production.
    // This'll be dead-code-eliminated in production 🎉
    if (process.env.NODE_ENV !== 'production') {
      warning(
        Scrollbars.instanceCount <= 1,
        'Warning: Multiple instances of Scrollbars detected. ' +
          'You likely only want one at a time, typically tied to a route.'
      );
    }

    this.updateScrollbars();
  }

  componentDidUpdate() {
    // Start by clearing the styles so we get a clean slate.
    const stylesheet = Scrollbars.styleDOMNode.sheet;
    clearStyles(stylesheet);

    this.updateScrollbars();
  }

  componentWillUnmount() {
    Scrollbars.instanceCount--;

    clearStyles(Scrollbars.styleDOMNode.sheet);
  }

  updateScrollbars() {
    const stylesheet = Scrollbars.styleDOMNode.sheet;

    Object.entries(this.props).forEach(([styleName, styles]) => {
      const selector = getSelectorForStyleName(styleName);

      addStyles({ stylesheet, selector, styles });
    });
  }

  render() {
    return null;
  }
}

export default Scrollbars;

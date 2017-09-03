import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class ScrollDisabler extends PureComponent {
  static propTypes = {
    // When the right-side modal is open, the nice dark-themed scrollbar I have
    // stands out like a sore thumb. This prop allows us to apply a class to
    // `body`, which temporarily changes the scrollbar theme.
    applyLightScrollTheme: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    this.oldOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    if (this.props.applyLightScrollTheme) {
      document.body.classList.add('light-scroll');
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = this.oldOverflow;
    document.body.classList.remove('light-scroll');
  }

  render() {
    return null;
  }
}

export default ScrollDisabler;

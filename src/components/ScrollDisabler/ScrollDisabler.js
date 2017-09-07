import { PureComponent } from 'react';
import PropTypes from 'prop-types';


class ScrollDisabler extends PureComponent {
  static propTypes = {
    // When the right-side modal is open, the nice dark-themed scrollbar I have
    // stands out like a sore thumb. This prop allows us to apply a class to
    // `body`, which temporarily changes the scrollbar theme.
    applyLightScrollTheme: PropTypes.bool,
  }
  componentDidMount() {
    this.oldOverflow = document.body.style.overflow;
    this.oldPosition = document.body.style.position;
    this.oldWidth = document.body.style.width;
    this.oldHeight = document.body.style.height;
    this.oldTop = document.body.style.top;

    this.oldScrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = `calc(100% + ${this.oldScrollY}px)`;
    document.body.style.top = `-${this.oldScrollY}px`;

    if (this.props.applyLightScrollTheme) {
      document.body.classList.add('light-scroll');
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = this.oldOverflow;
    document.body.style.position = this.oldPosition;
    document.body.style.width = this.oldWidth;
    document.body.style.height = this.oldHeight;
    document.body.style.top = this.oldTop;

    window.scrollTo(0, this.oldScrollY)

    document.body.classList.remove('light-scroll');
  }

  render() {
    return null;
  }
}

export default ScrollDisabler;

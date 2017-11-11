import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { random, sample } from '../../utils';

// All shapes should be a single <path> element, which will be inserted into
// a 200x200 SVG.
const PATHS = {
  zigzag: 'M 0 40 L 40 160 L 80 40 L 120 160 L 160 40 L 200 160',
  square: 'M 0 200 V 0 H 200 V 200 H 66 V 66 H 132 V 132',
  triangle: 'M 0 200 L 100 27 L 200 200 L 50 200',
  pyramid: `
    M 0 200  L 100 27
    M 50 200 L 125 70
    M 100 200 L 150 113
    M 150 200 L 175 157
    M 195 200 L 197.5 195.66
  `,
};

class Particle extends PureComponent {
  static propTypes = {
    shape: PropTypes.oneOf(Object.keys(PATHS)),
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    rotation: PropTypes.number,
    drawDelay: PropTypes.number,
    drawSpeed: PropTypes.number,
  };

  static defaultProps = {
    color: 'rgba(255, 255, 255, 0.2)',
    size: 50,
  };

  // Choose a random shape and rotation if not provided via props.
  // Can't happen in `defaultProps` since we want each instance to have its own
  // randomized shape.
  shape = this.props.shape || sample(Object.keys(PATHS));

  drawDelay = typeof this.props.drawDelay === 'number'
    ? this.props.drawDelay
    : random(500, 5000);

  drawSpeed = typeof this.props.drawSpeed === 'number'
    ? this.props.drawSpeed
    : random(1000, 4000);

  undrawDelay = typeof this.props.undrawDelay === 'number'
    ? this.props.undrawDelay
    : random(2000, 7000);

  componentDidMount() {
    const pathLength = this.pathElem.getTotalLength();

    this.pathElem.style.strokeDasharray = pathLength;
    this.pathElem.style.strokeDashoffset = pathLength;

    this.drawTimeoutId = window.setTimeout(() => {
      // Set our initial transition. We need to do this dynamically,
      // otherwise it'll animate the initial hide.
      this.pathElem.style.transition = `stroke-dashoffset ${this.drawSpeed}ms`;
      this.drawCycle();
    }, this.drawDelay);
  }

  componentWillUnmount() {
    window.clearTimeout(this.drawTimeoutId);
    window.clearTimeout(this.undrawTimeoutId);
  }

  // TODO: This method is gross and callback-y. Use promises?
  drawCycle = () => {
    const pathLength = this.pathElem.getTotalLength();

    // Start by drawing the line
    this.pathElem.style.strokeDashoffset = 0;

    // We want to wait for the draw animation to complete + the undraw delay
    // time.
    const undrawAfter = this.drawSpeed + this.undrawDelay;

    this.undrawTimeoutId = window.setTimeout(() => {
      this.pathElem.style.strokeDashoffset = pathLength;

      // After the undraw is completed, wait another 'drawDelay'.
      // Then, re-invoke this method, so that the cycle restarts.
      const drawAfter = this.drawSpeed + this.drawDelay;
      this.drawTimeoutId = window.setTimeout(this.drawCycle, drawAfter);
    }, undrawAfter);
  };

  render() {
    const { size, color } = this.props;
    const { shape } = this;

    const path = PATHS[shape];

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={{
          overflow: 'visible',
        }}
      >
        <path
          ref={elem => (this.pathElem = elem)}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={20}
        />
      </svg>
    );
  }
}

export default Particle;

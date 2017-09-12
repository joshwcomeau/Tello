import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../../constants';
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
  }

  static defaultProps = {
    color: 'rgba(255, 255, 255, 0.2)',
    size: 50,
  }

  // Choose a random shape and rotation if not provided via props.
  // Can't happen in `defaultProps` since we want each instance to have its own
  // randomized shape.
  shape = this.props.shape || sample(Object.keys(PATHS))

  drawDelay = typeof this.props.drawDelay === 'number'
    ? this.props.drawDelay
    : random(500, 5000)

  drawSpeed = typeof this.props.drawSpeed === 'number'
    ? this.props.drawSpeed
    : random(1000, 4000)

  componentDidMount() {
    const pathLength = this.pathElem.getTotalLength();

    this.pathElem.style.strokeDasharray = pathLength;
    this.pathElem.style.strokeDashoffset = pathLength;

    this.initialAnimationTimeoutId = window.setTimeout(() => {
      this.pathElem.style.transition = `stroke-dashoffset ${this.drawSpeed}ms`;
      this.pathElem.style.strokeDashoffset = 0;
    }, this.drawDelay)
  }

  render() {
    const { size, color } = this.props;
    const { shape, rotation } = this;

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
          ref={elem => this.pathElem = elem}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={20}
          strokeLinecap="square"
        />
      </svg>
    );
  }
}


export default Particle;

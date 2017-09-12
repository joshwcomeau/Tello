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
  triangleSolid: `
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
  }

  static defaultProps = {
    color: 'rgba(255, 255, 255, 0.25)',
    size: 50,
    rotation: 0,
  }

  // Choose a random shape and rotation if not provided via props.
  // Can't happen in `defaultProps` since we want each instance to have its own
  // randomized shape.
  shape = this.props.shape || sample(Object.keys(PATHS))
  rotation = this.props.rotation || random(0, 360)

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
          transform: `rotateZ(${rotation}deg)`,
        }}
      >
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={Math.round(size * 0.4)}
          strokeLinecap="square"
        />
      </svg>
    );
  }
}


export default Particle;

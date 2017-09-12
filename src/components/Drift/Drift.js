import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { random } from '../../utils';

import { getTransformString } from './Drift.helpers';


class Drift extends PureComponent {
  static propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    isFrozen: PropTypes.bool,
  }

  state = {
    x: this.props.initialX,
    y: this.props.initialY,
  }

  driftX = random(-10, 10);
  driftY = random(-10, 10);

  componentDidMount() {
    this.tick();
  }

  tick = () => {
    // Allow "freezing" through props, to lock an instance in place.
    if (this.props.isFrozen) {
      return;
    }

    window.requestAnimationFrame(() => {
      this.setState(state => ({
        x: state.x + this.driftX / 100,
        y: state.y + this.driftY / 100,
      }), this.tick);
    });
  }

  render() {
    const { x, y } = this.state;
    const { children } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: getTransformString({ x, y }),
        }}
      >
        {children}
      </div>
    );
  }
}

export default Drift;

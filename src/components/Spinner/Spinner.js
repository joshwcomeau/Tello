import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from 'emotion';
import styled from 'react-emotion';

import { range } from '../../utils';

import {
  getBackgroundForNode,
  getSizeInPx,
  getTransformOrigin,
} from './Spinner.helpers';

class Spinner extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
    fadeInDuration: PropTypes.number.isRequired,
  };

  static defaultProps = {
    size: 'medium',
    fadeInDuration: 600,
  };

  render() {
    const sizeInPx = getSizeInPx(this.props.size);

    return (
      <SpinnerWrapper
        size={sizeInPx}
        spacing={sizeInPx / 2}
        fadeInDuration={this.props.fadeInDuration}
      >
        {range(5).map(i => (
          <SpinnerSquare
            key={i}
            index={i}
            size={sizeInPx}
            style={{
              transformOrigin: getTransformOrigin(i),
            }}
          />
        ))}
      </SpinnerWrapper>
    );
  }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const squint = keyframes`
  0% { transform: scale(1, 1); }
  20% { transform: scale(1, 0.25); }
  40% { transform: scale(1, 0.25); }
  60% { transform: scale(1, 1); }
  80% { transform: scale(0.25, 1); }
  100% { transform: scale(1, 1); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  width: ${props => props.size * 5 + props.spacing * 4 + 'px'};
  justify-content: space-between;
  animation: ${fadeIn} 1s ease ${props => props.fadeInDuration + 'ms'} both;
`;

const SpinnerSquare = styled.div`
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background-color: ${props => getBackgroundForNode(props.index)};
  animation: ${squint} 3s infinite ease ${props => props.index * 100 + 'ms'};
`;

export default Spinner;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from 'emotion';
import styled from 'emotion/react';
import { StaggeredMotion, spring } from 'react-motion';

import {
  getBackgroundForNode,
  getScaleValues,
  getSizeInPx,
  getTransformOrigin,
} from './Spinner.helpers';


class Spinner extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  }

  static defaultProps = {
    size: 'md',
  }

  state = {
    tick: 0,
  }

  intervalLength = 600;
  springConfig = {
    stiffness: 155,
    damping: 18,
  }

  componentDidMount() {
    this.intervalId = window.setInterval(this.updateTick, this.intervalLength);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  updateTick = () => {
    this.setState(state => ({
      tick: state.tick + 1,
    }));
  }

  render() {
    const sizeInPx = getSizeInPx(this.props.size);

    return (
      <Wrapper>
        <StaggeredMotion
          defaultStyles={[
            { y: 1, x: 0.25 },
            { y: 1, x: 0.25 },
            { y: 1, x: 0.25 },
            { y: 1, x: 0.25 },
            { y: 1, x: 0.25 },
          ]}
          styles={previousStyles => previousStyles.map((_, i) => {
            const { x, y } = getScaleValues(this.state.tick);

            return i === 0
              ? {
                x: spring(x, this.springConfig),
                y: spring(y, this.springConfig)
              } : {
                x: spring(previousStyles[i - 1].x, this.springConfig),
                y: spring(previousStyles[i - 1].y, this.springConfig),
              };
          })}
        >
          {(styles) => (
            <SpinnerElem size={sizeInPx} spacing={sizeInPx / 2}>
              {styles.map(({ x, y }, i) => (
                // Using inline styles here instead of emotion/react for perf
                // reasons (a new element is created every time if I use them
                // :/)
                <div
                  key={i}
                  style={{
                    width: sizeInPx,
                    height: sizeInPx,
                  }}
                >
                  <div style={{
                    width: sizeInPx,
                    height: sizeInPx,
                    transform: `scale(${x}, ${y})`,
                    transformOrigin: getTransformOrigin(i),
                    background: getBackgroundForNode(i),
                  }} />
                </div>
              ))}
            </SpinnerElem>
          )}
        </StaggeredMotion>
      </Wrapper>
    );
  }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 1s ease 600ms both;
`;

const SpinnerElem = styled.div`
  display: flex;
  width: ${props => props.size * 5 + props.spacing * 4 + 'px'};
  justify-content: space-between;
`;

export default Spinner;

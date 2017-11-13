import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { keyframes } from 'emotion';
import styled from 'react-emotion';

import {
  COLORS,
  UNITS_IN_PX,
  Z_INDICES,
  IS_MOBILE_USER_AGENT,
} from '../../constants';
import { tapSwipeIndicator } from '../../actions';
import swipeImg from '../../images/swipe.png';

class SwipeIndicator extends PureComponent {
  state = {
    isVisible: false,
  };

  componentDidMount() {
    if (this.props.isNeeded) {
      this.timerId = window.setTimeout(this.showIndicator, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    // if the user swipes before the component is made visible, we can
    // cancel it altogether, since the user figured it out.
    if (prevProps.isNeeded && !this.props.isNeeded) {
      window.clearTimeout(this.showIndicator);

      this.setState({
        isVisible: false,
      });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.showIndicator);
  }

  showIndicator = () => {
    this.setState({
      isVisible: true,
    });
  };

  render() {
    const { tapSwipeIndicator } = this.props;
    const { isVisible } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <SwipeIndicatorWrapper onTouchStart={tapSwipeIndicator}>
        <HandImage src={swipeImg} />
        Swipe to navigate
      </SwipeIndicatorWrapper>
    );
  }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const rotate = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px) rotate(10deg);
  }
  15% {
    opacity: 1;
    transform: translateX(20px) rotate(10deg);
  }
  80% {
    opacity: 1;
    transform: translateX(-20px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px) rotate(0deg);
  }
`;

const SwipeIndicatorWrapper = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.alert};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${UNITS_IN_PX[1]};
  height: 75%;
  font-size: 22px;
  color: ${COLORS.gray.light};
  background: rgba(0, 0, 0, 0.75);
  animation: ${fadeIn} 1250ms;
`;

const HandImage = styled.img`
  margin-bottom: ${UNITS_IN_PX[2]};
  animation: ${rotate} 3000ms infinite;
  transform-origin: center bottom;
`;

const mapStateToProps = state => ({
  isNeeded: IS_MOBILE_USER_AGENT && !state.mobile.hasSeenSwipeIndicator,
});

export default connect(mapStateToProps, { tapSwipeIndicator })(SwipeIndicator);

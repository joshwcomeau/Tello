import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';

import { getMessage, getMessageType } from '../../reducers/flash.reducer';
import { hideFlashMessage } from '../../actions';
import { UNITS_IN_PX } from '../../constants';

import { getColorForMessageType } from './FlashMessage.helpers';


class FlashMessage extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.oneOf(['alert', 'error', 'success']),
  }

  static defaultProps = {
    duration: 5000,
  }

  componentDidUpdate(prevProps) {
    const { message, duration, hideFlashMessage } = this.props;

    console.log('UPDATE', message, prevProps.message)

    // If there is no provided message, do nothing.
    if (!message) {
      return;
    }

    // If there's a message that doesn't match, it means we have something
    // new to display!
    if (prevProps.message !== message) {
      // Reset the current timeout, so that it resets the timer.
      window.clearTimeout(this.messageTimerId);

      this.messageTimerId = window.setTimeout(hideFlashMessage, duration);
    }
  }

  render() {
    const { duration, message, messageType } = this.props;

    return (
      <Wrapper
        duration={duration}
        isVisible={!!message}
        type={messageType}
      >
        {message}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${UNITS_IN_PX[2]};
  background: ${getColorForMessageType};
  transform: ${props => props.isVisible ? `translateY(0)` : `translateY(-100%)`};
  transition: 850ms;
`;

const mapStateToProps = state => ({
  message: getMessage(state),
  messageType: getMessageType(state),
});

export default connect(mapStateToProps, { hideFlashMessage })(FlashMessage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';

import { getMessage, getMessageType } from '../../reducers/flash.reducer';
import { hideFlashMessage } from '../../actions';
import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';

import { getColorForMessageType } from './FlashMessage.helpers';


class FlashMessage extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.oneOf(['alert', 'error', 'success']),
  }

  static defaultProps = {
    duration: 7000,
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
    const { duration, message, messageType, hideFlashMessage } = this.props;

    return (
      <Wrapper
        duration={duration}
        isVisible={!!message}
        type={messageType}
      >
        <span dangerouslySetInnerHTML={{ __html: message }} />
        <Dismiss onClick={hideFlashMessage}>
          <DismissIcon />
        </Dismiss>
      </Wrapper>
    );
  }
}

const FLASH_HEIGHT = Math.round(UNIT * 2.5) + 'px';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${FLASH_HEIGHT};
  background: #FFF;
  color: ${getColorForMessageType};
  transform: ${props => props.isVisible ? `translateY(0)` : `translateY(-100%)`};
  transition: 850ms;
  font-size: 15px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  padding: 0 ${UNITS_IN_PX[2]};
`;

const Message = styled.div`
  flex: 1;
`;

const Dismiss = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${FLASH_HEIGHT};
  border: none;
  background: transparent;
  color: ${COLORS.red.primary};
  font-size: 21px;
  outline: none;
  cursor: pointer;
`;

const DismissIcon = styled.span`
  &:before {
    content: '×';
  }

  display: inline-block;
  transform: translateY(-2px);
`;

const mapStateToProps = state => ({
  message: getMessage(state),
  messageType: getMessageType(state),
});

export default connect(mapStateToProps, { hideFlashMessage })(FlashMessage);

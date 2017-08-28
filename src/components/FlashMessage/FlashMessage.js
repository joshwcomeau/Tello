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
    duration: 500,
  }

  componentDidUpdate(prevProps) {
    const { message, duration, hideFlashMessage } = this.props;

    if (prevProps.message !== message) {
      this.messageTimerId = window.setTimeout(hideFlashMessage, duration);
    }
  }

  render() {
    const { message, messageType } = this.props;

    return (
      <FlipMove
        duration={1000}
        enterAnimation={{
         from: { transform: 'translateY(-100%)' },
         to: { transform: 'translateY(0)' },
       }}
       leaveAnimation={{
         from: { transform: 'translateY(0)' },
         to: { transform: 'translateY(-100%)' },
       }}
      >
        {message && (
          <Wrapper key="flash-message" type={messageType}>
            {message}
          </Wrapper>
        )}
      </FlipMove>
    );
  }
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: ${UNITS_IN_PX[2]};
  background: ${getColorForMessageType};
`;

const mapStateToProps = state => ({
  message: getMessage(state),
  messageType: getMessageType(state),
});

export default connect(mapStateToProps, { hideFlashMessage })(FlashMessage);

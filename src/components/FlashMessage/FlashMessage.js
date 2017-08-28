import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';

import { getMessage, getMessageType } from '../../reducers/flash.reducer';
import { hideFlashMessage } from '../../actions';
import { UNITS_IN_PX } from '../../constants';


class FlashMessage extends Component {
  componentDidUpdate(prevProps) {

  }

  render() {
    const { message, messageType } = this.props;

    return (
      <FlipMove
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
  top: 0;
  left: 0;
  right: 0;
  height: ${UNITS_IN_PX[1]};
  background: red;
`;

const mapStateToProps = state => ({
  message: getMessage(state),
  messageType: getMessageType(state),
});

export default connect(mapStateToProps, { hideFlashMessage })(FlashMessage);

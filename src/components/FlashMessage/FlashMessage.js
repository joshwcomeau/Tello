import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import {
  getMessage,
  getMessageType,
  getAction,
  getActionLabel,
} from '../../reducers/flash.reducer';
import { hideFlashMessage } from '../../actions';
import { COLORS, UNIT, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';

import { getColorForMessageType } from './FlashMessage.helpers';

class FlashMessage extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.oneOf(['alert', 'error', 'success']),
    action: PropTypes.object,
    actionLabel: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    duration: 7000,
  };

  componentDidUpdate(prevProps) {
    const { message, duration, dispatch } = this.props;

    // If there is no provided message, do nothing.
    if (!message) {
      return;
    }

    // If there's a message that doesn't match, it means we have something
    // new to display!
    if (prevProps.message !== message) {
      // Reset the current timeout, so that it resets the timer.
      window.clearTimeout(this.messageTimerId);

      this.messageTimerId = window.setTimeout(
        () => dispatch(hideFlashMessage()),
        duration
      );
    }
  }

  handleActionClick = () => {
    // NOTE: Because we aren't using `mapDispatchToProps`, `dispatch` is passed
    // in as a prop (we have to do it this way, since the `action` comes from
    // redux as well, so it isn't part of `ownProps`).
    const { dispatch, action } = this.props;

    // Start by hiding the flash message. The action we'll dispatch afterwards
    // might show its own, but otherwise we probably want to hide the now-stale
    // one.
    dispatch(hideFlashMessage());

    // Cancel the hide-message timeout as well
    window.clearTimeout(this.messageTimerId);

    dispatch(action);
  };

  handleCloseClick = () => {
    const { dispatch } = this.props;

    dispatch(hideFlashMessage());

    // Cancel the hide-message timeout as well
    window.clearTimeout(this.messageTimerId);
  };

  render() {
    const { duration, message, messageType, action, actionLabel } = this.props;

    return (
      <FlashMessageElem
        duration={duration}
        isVisible={!!message}
        type={messageType}
      >
        <span>
          <span dangerouslySetInnerHTML={{ __html: message }} />
          {action && (
            <Action onClick={this.handleActionClick}>{actionLabel}</Action>
          )}
        </span>

        <Dismiss onClick={this.handleCloseClick}>
          <DismissIcon />
        </Dismiss>
      </FlashMessageElem>
    );
  }
}

const FLASH_HEIGHT = Math.round(UNIT * 2.5) + 'px';

const FlashMessageElem = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${FLASH_HEIGHT};
  background: #fff;
  color: ${getColorForMessageType};
  transform: ${props =>
    props.isVisible ? `translateY(0)` : `translateY(-100%)`};
  transition: 850ms;
  font-size: 15px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  padding: ${HALF_UNIT_PX} ${UNITS_IN_PX[2]};
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

const Action = styled.a`
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
`;

const mapStateToProps = state => ({
  message: getMessage(state),
  messageType: getMessageType(state),
  action: getAction(state),
  actionLabel: getActionLabel(state),
});

export default connect(mapStateToProps)(FlashMessage);

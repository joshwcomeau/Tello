import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Motion } from 'react-motion';
import PropTypes from 'prop-types';

import {
  BREAKPOINTS,
  COLORS,
  MODAL_BG_COLOR,
  Z_INDICES,
  UNITS_IN_PX,
} from '../../constants';
import { getSpring, getModalChildComponent } from './Modal.helpers';

import Backdrop from '../Backdrop';
import ScrollDisabler from '../ScrollDisabler';

const propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyup);
  }

  handleKeyup = ev => {
    const { isVisible, handleClose } = this.props;
    const isEscapeKey = ev.keyCode === 27;

    if (isVisible && isEscapeKey) {
      handleClose();
    }
  };

  render() {
    const { side, isVisible, handleClose, children } = this.props;

    return (
      <ModalWrapper isVisible={isVisible}>
        {isVisible && (
          <ScrollDisabler applyLightScrollTheme={side === 'right'} />
        )}

        <Backdrop isVisible={isVisible} onClick={handleClose} />

        <Motion style={{ x: getSpring(side, isVisible) }}>
          {({ x }) => (
            <ModalElem
              side={side}
              style={{
                transform: `translateX(${x}%)`,
                WebkitTransform: `translateX(${x}%)`,
              }}
            >
              {children}
            </ModalElem>
          )}
        </Motion>
      </ModalWrapper>
    );
  }
}

const ModalWrapper = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.modal};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;

const ModalElem = styled.div`
  position: absolute;
  z-index: ${Z_INDICES.alert + 1};
  top: 0;
  right: ${props => (props.side === 'right' ? 0 : 'auto')};
  left: ${props => (props.side === 'left' ? 0 : 'auto')};
  bottom: 0;
  width: 800px;
  max-width: 85%;
  padding: ${UNITS_IN_PX[3]} ${UNITS_IN_PX[4]};
  background: ${MODAL_BG_COLOR};
  color: ${COLORS.gray.veryDark};
  will-change: transform;

  @media ${BREAKPOINTS.sm} {
    padding: ${UNITS_IN_PX[3]} ${UNITS_IN_PX[2]};
  }
`;

Modal.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const { side } = ownProps;

  const selectedModal = state.modals[side];
  const isVisible = !!selectedModal;

  const selectedModalComponent = isVisible
    ? getModalChildComponent(selectedModal.id)
    : null;

  const children = isVisible
    ? React.createElement(selectedModalComponent, selectedModal.data)
    : null;

  return { isVisible, children };
};

export default connect(mapStateToProps)(Modal);

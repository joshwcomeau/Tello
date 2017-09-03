import React from 'react';
import styled from 'emotion/react';
import { Motion } from 'react-motion';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';
import { getSpring } from './Modal.helpers';


const propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const Modal = ({ side, isVisible, handleClose, children }) => (
  <Wrapper isVisible={isVisible}>
    <Backdrop isVisible={isVisible} onClick={handleClose} />
    <Motion
      style={{ x: getSpring(side, isVisible) }}
    >
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
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: ${props => props.isVisible ? 'normal' : 'none'};
`;

const Backdrop = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 750ms;
`;

const ModalElem = styled.div`
  position: absolute;
  z-index: 101;
  top: 0;
  right: ${props => props.side === 'right' ? 0 : 'auto'};
  left: ${props => props.side === 'left' ? 0 : 'auto'};
  bottom: 0;
  width: 800px;
  max-width: 85%;
  padding: ${UNITS_IN_PX[3]} ${UNITS_IN_PX[4]};
  background: ${COLORS.gray.veryLight};
  color: ${COLORS.gray.veryDark};
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
  will-change: transform;
`

Modal.propTypes = propTypes;

export default Modal;

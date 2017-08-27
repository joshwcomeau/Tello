import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';


const propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const Modal = ({ isVisible, handleClose, children }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <Backdrop isVisible={isVisible} onClick={handleClose} />
      <ModalElem isVisible={isVisible}>
        {children}
      </ModalElem>
    </Wrapper>
  );
};

Modal.propTypes = propTypes;


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
  right: 0;
  bottom: 0;
  width: 800px;
  max-width: 85%;
  padding: ${UNITS_IN_PX[3]} ${UNITS_IN_PX[4]};
  background: ${COLORS.gray.veryLight};
  color: ${COLORS.gray.veryDark};
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 500ms;
`

export default Modal;

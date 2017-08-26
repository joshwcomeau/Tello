import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';


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
  transition: opacity 800ms;
`;

const ModalElem = styled.div`
  position: absolute;
  z-index: 101;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  background: white;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 500ms;
`

export default Modal;

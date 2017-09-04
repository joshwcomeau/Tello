import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import styled from 'emotion/react';
import { Motion } from 'react-motion';
import PropTypes from 'prop-types';

import { COLORS, Z_INDICES, UNITS_IN_PX, ROW_HEIGHT_PX } from '../../constants';

import Backdrop from '../Backdrop';
import Heading from '../Heading';
import ScrollDisabler from '../ScrollDisabler';


const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

const Confirm = ({ title, children, handleConfirm, handleCancel, isVisible }) => (
  <ConfirmWrapper isVisible={isVisible}>
    {isVisible && <ScrollDisabler />}

    <Backdrop isVisible={isVisible} onClick={handleCancel} />

    <ConfirmElem isVisible={isVisible}>
      <Header>
        <Heading>{title}</Heading>

        {children}
      </Header>

      <Actions>
        <ConfirmButton onClick={handleConfirm}>
          Confirm
        </ConfirmButton>
        <CancelButton onClick={handleCancel}>
          Cancel
        </CancelButton>
      </Actions>
    </ConfirmElem>
  </ConfirmWrapper>
);


// TODO: There's a lot of shared styles/logic between this and Modal.js
// Does it make sense to extract a primitive to tackle this?
const ConfirmWrapper = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.alert};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`;

const ConfirmElem = styled.div`
  position: relative;
  z-index: ${Z_INDICES.alert + 1};
  width: 500px;
  background: ${COLORS.white};
  color: ${COLORS.gray.veryDark};
`;

const Header = styled.header`
  padding: ${UNITS_IN_PX[2]};
`;

const Actions = styled.div`
  display: flex;
`;

const actionButtonCSS = css`
  flex: 1;
  background-color: transparent;
  border: none;
  border-top: 1px solid ${COLORS.gray.light};
  height: ${ROW_HEIGHT_PX};
  font-size: 18px;
  font-weight: bold;
  transition: background-color 400ms;

  &:hover {
    background-color: ${COLORS.gray.light};
  }
`;

const ConfirmButton = styled.button`
  ${actionButtonCSS};
  border-right: 1px solid ${COLORS.gray.light};
`;

const CancelButton = styled.button`
  ${actionButtonCSS};
`;

export default Confirm;

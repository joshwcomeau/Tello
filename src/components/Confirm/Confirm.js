import React from 'react';
import { confirmable } from 'react-confirm';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';

import { COLORS, Z_INDICES, UNITS_IN_PX, ROW_HEIGHT_PX } from '../../constants';

import Backdrop from '../Backdrop';
import Heading from '../Heading';
import ScrollDisabler from '../ScrollDisabler';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  // These props all come from react-confirm
  show: PropTypes.bool,
  proceed: PropTypes.func,
  dismiss: PropTypes.func,
};

export const Confirm = ({
  title,
  children,
  // Rename the `react-confirm` props to be more idiomatic with this codebase.
  show: isVisible,
  proceed: handleConfirm,
  dismiss: handleDismiss,
}) => (
  <ConfirmWrapper isVisible={isVisible}>
    {isVisible && <ScrollDisabler />}

    <Backdrop isVisible={isVisible} onClick={handleDismiss} />

    <Motion
      defaultStyle={{ visibleProgress: 0 }}
      style={{ visibleProgress: spring(isVisible ? 1 : 0) }}
    >
      {({ visibleProgress }) => (
        <ConfirmElem
          style={{
            opacity: visibleProgress,
            transform: `translateY(${visibleProgress * -45}px)`,
          }}
        >
          <Header>
            <Heading>{title}</Heading>

            {children}
          </Header>

          <Actions>
            <CancelButton onClick={handleDismiss}>Cancel</CancelButton>
            <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
          </Actions>
        </ConfirmElem>
      )}
    </Motion>
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
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
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
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.gray.veryLight};
  }
`;

const ConfirmButton = styled.button`
  ${actionButtonCSS};
`;

const CancelButton = styled.button`
  ${actionButtonCSS};
  border-right: 1px solid ${COLORS.gray.light};
`;

Confirm.propTypes = propTypes;

export default confirmable(Confirm);

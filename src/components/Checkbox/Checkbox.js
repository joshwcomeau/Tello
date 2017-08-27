import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';


const propTypes = {
  highlighted: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Checkbox = ({ highlighted, checked, disabled, handleClick }) => {
  // We want to add blue colour when we're mousing over it, or it's
  // checked, UNLESS it's been disabled.
  const isColored = !disabled && (highlighted || checked);
  return (
    <Wrapper onClick={!disabled && handleClick}>
      <CheckboxBorder colored={isColored} />
      <CheckboxDot colored={isColored} visible={checked} />
    </Wrapper>
  );
};

Checkbox.propTypes = propTypes;


const Wrapper = styled.div`
  position: relative;
  width: ${UNITS_IN_PX[1]};
  height: ${UNITS_IN_PX[1]};
  margin-right: ${UNITS_IN_PX[1]};
`

const borderWidth = 2;
const cellPadding = 0;
const dotSize = UNIT - (borderWidth * 2) - (cellPadding * 2);

const getColor = ({ colored }) => (
  colored
    ? COLORS.blue.primary
    : COLORS.gray.dark
);

const CheckboxBorder = styled.div`
  width: ${UNITS_IN_PX[1]};
  height: ${UNITS_IN_PX[1]};
  border-width: ${borderWidth + 'px'};
  border-style: solid;
  border-color: ${getColor};
`;

const CheckboxDot = styled.div`
  position: absolute;
  width: ${dotSize + 'px'};
  height: ${dotSize + 'px'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: ${getColor};
  transform: scale(${props => props.visible ? 1 : 0});
  transition: transform 250ms;
`;

export default Checkbox;

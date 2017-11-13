import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { COLORS, UNITS_IN_PX } from '../../constants';

const propTypes = {
  highlighted: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
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

const SIZE = 14;
const BORDER_WIDTH = 2;
const CELL_PADDING = 0;
const DOT_SIZE = SIZE - BORDER_WIDTH * 2 - CELL_PADDING * 2;

const getColor = ({ colored }) =>
  colored ? COLORS.blue.primary : COLORS.gray.dark;

const Wrapper = styled.div`
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
  margin-right: ${UNITS_IN_PX[1]};
`;

const CheckboxBorder = styled.div`
  width: ${SIZE + 'px'};
  height: ${SIZE + 'px'};
  border-width: ${BORDER_WIDTH + 'px'};
  border-style: solid;
  border-color: ${getColor};
`;

const CheckboxDot = styled.div`
  position: absolute;
  width: ${DOT_SIZE + 'px'};
  height: ${DOT_SIZE + 'px'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: ${getColor};
  transform: scale(${props => (props.visible ? 1 : 0)});
  transition: transform 250ms;
`;

export default Checkbox;

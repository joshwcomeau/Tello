import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';


const Checkbox = ({ highlighted, checked, handleClick }) => {
  return (
    <Wrapper>
      <CheckboxBorder
        colored={highlighted || checked}
        onClick={handleClick}
      />

      <CheckboxDot
        visible={checked}
      />
    </Wrapper>
  );
};


const Wrapper = styled.div`
  position: relative;
  width: ${UNITS_IN_PX[1]};
  height: ${UNITS_IN_PX[1]};
  margin-right: ${UNITS_IN_PX[1]};
`

const borderWidth = 2;
const cellPadding = 0;
const dotSize = UNIT - (borderWidth * 2) - (cellPadding * 2);

const CheckboxBorder = styled.div`
  width: ${UNITS_IN_PX[1]};
  height: ${UNITS_IN_PX[1]};
  border-width: ${borderWidth + 'px'};
  border-style: solid;
  border-color: ${props => props.colored ? COLORS.blue.primary : COLORS.gray.dark};
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
  background-color: ${COLORS.blue.primary};
  transform: scale(${props => props.visible ? 1 : 0});
  transition: transform 250ms;
`;

export default Checkbox;

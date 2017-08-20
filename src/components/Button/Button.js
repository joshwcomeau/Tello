import React from 'react';
import styled from 'emotion/react';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';



const defaultProps = {
  color: 'blue',
};

const Button = ({ color, children }) => {
  return (
    <ButtonElem color={color}>
      {children}
    </ButtonElem>
  );
};

Button.defaultProps = defaultProps;

const buttonColors = {
  red: {
    light: COLORS.red .primary,
    dark: COLORS.red.primary,
    border: COLORS.red.dark,
  },
  blue: {
    light: COLORS.blue.primary,
    dark: COLORS.deepPurple.primary,
    border: COLORS.deepPurple.dark,
  },
};

const ButtonElem = styled.button`
  padding: 0 ${UNITS_IN_PX[3]};
  height: ${ROW_HEIGHT_PX};
  background: linear-gradient(
    ${props => buttonColors[props.color].light},
    ${props => buttonColors[props.color].dark}
  );
  border: none;
  border-bottom: 5px solid ${props => buttonColors[props.color].border};
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
`;


export default Button;

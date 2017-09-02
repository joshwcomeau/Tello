import React from 'react';
import styled from 'emotion/react';
import { css } from 'emotion';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';


const defaultProps = {
  color: 'blue',
  size: 'medium',
  tag: 'button',
};

const Button = (props) => {
  const {tag, ...delegatedProps} = props;

  return React.createElement(
    tag === 'button' ? ButtonElem : LinkButtonElem,
    delegatedProps
  );
};

Button.defaultProps = defaultProps;

const buttonColors = {
  red: {
    background: COLORS.red.primary,
    backgroundHover: `linear-gradient(
      ${COLORS.red.light},
      ${COLORS.red.primary}
    )`,
    borderColor: COLORS.red.dark,
  },
  blue: {
    background: COLORS.deepPurple.primary,
    backgroundHover: `linear-gradient(
      ${COLORS.blue.primary},
      ${COLORS.deepPurple.primary}
    )`,
    borderColor: COLORS.deepPurple.dark,
  },
  gray: {
    background: COLORS.gray.dark,
    backgroundHover: `linear-gradient(
      ${COLORS.gray.primary},
      ${COLORS.gray.dark}
    )`,
    borderColor: COLORS.gray.veryDark,
  },
};

const buttonSizes = {
  small: {
    height: UNITS_IN_PX[2],
    padding: UNITS_IN_PX[1],
    font: '12px',
    borderWidth: '2px',
  },
  medium: {
    height: ROW_HEIGHT_PX,
    padding: UNITS_IN_PX[3],
    font: '18px',
    borderWidth: '5px',
  },
};

const generateElem = elem => styled(elem)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.fill ? '100%' : 'auto'};
  height: ${props => buttonSizes[props.size].height};
  padding: 0 ${props => buttonSizes[props.size].padding};
  color: ${COLORS.white};
  font-size: ${props => buttonSizes[props.size].font};
  font-weight: bold;
  background: ${props => buttonColors[props.color].background};
  border: none;
  border-bottom-width: ${props => buttonSizes[props.size].borderWidth};
  border-bottom-style: solid;
  border-bottom-color: ${props => buttonColors[props.color].borderColor};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${props => buttonColors[props.color].backgroundHover};
  }

  &:disabled {
    background: ${COLORS.gray.primary} !important;
    border-bottom: 5px solid rgba(0, 0, 0, 0.25) !important;
    cursor: not-allowed;
  }
`;

const ButtonElem = generateElem('button');
const LinkButtonElem = generateElem('a');

export default Button;

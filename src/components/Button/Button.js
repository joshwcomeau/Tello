import React from 'react';
import styled from 'emotion/react';
import { css } from 'emotion';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';


const defaultProps = {
  color: 'blue',
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
    backgroundHover: COLORS.red.dark,
    border: '5px solid ' + COLORS.red.dark,
  },
  blue: {
    background: COLORS.deepPurple.primary,
    backgroundHover: `linear-gradient(
      ${COLORS.blue.primary},
      ${COLORS.deepPurple.primary}
    )`,
    border: '5px solid ' + COLORS.deepPurple.dark,
  },
};

const generateButtonGetter = attribute => props => (
  buttonColors[props.color][attribute]
);

const getButtonBackground = generateButtonGetter('background');
const getButtonHoverBackground = generateButtonGetter('backgroundHover');
const getButtonBorder = generateButtonGetter('border');

const buttonCSS = css`
  padding: 0 ${UNITS_IN_PX[3]};
  height: ${ROW_HEIGHT_PX};
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background: ${COLORS.gray.primary} !important;
    border-bottom: 5px solid rgba(0, 0, 0, 0.25) !important;
    cursor: not-allowed;
  }
`;

// TODO: Figure out how to dedupe the props-based styles.
// Can't just have background/border in the `css` call, since it's dependent
// on props.
const ButtonElem = styled.button`
  composes: ${buttonCSS};
  width: ${props => props.fill ? '100%' : 'auto'};
  background: ${getButtonBackground};
  border: none;
  border-bottom: ${getButtonBorder};

  &:hover {
    background: ${getButtonHoverBackground};
  }
`;

const LinkButtonElem = styled.a`
  composes: ${buttonCSS};
  width: ${props => props.fill ? '100%' : 'auto'};
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${getButtonBackground};
  border: none;
  border-bottom: ${getButtonBorder};

  &:hover {
    background: ${getButtonHoverBackground};
  }
`;

export default Button;

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

const buttonCSS = css`
  padding: 0 ${UNITS_IN_PX[3]};
  height: ${ROW_HEIGHT_PX};
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
`

// TODO: Figure out how to dedupe the props-based styles.
// Can't just have background/border in the `css` call, since it's dependent
// on props.
const ButtonElem = styled.button`
  composes: ${buttonCSS};
  background: linear-gradient(
    ${props => buttonColors[props.color].light},
    ${props => buttonColors[props.color].dark}
  );
  border: none;
  border-bottom: 5px solid ${props => buttonColors[props.color].border};
`;

const LinkButtonElem = styled.a`
  composes: ${buttonCSS};
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    ${props => buttonColors[props.color].light},
    ${props => buttonColors[props.color].dark}
  );
  border: none;
  border-bottom: 5px solid ${props => buttonColors[props.color].border};
`;

export default Button;

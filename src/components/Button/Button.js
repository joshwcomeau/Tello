import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';

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
  lightBlue: {
    background: COLORS.blue.primary,
    backgroundHover: `linear-gradient(
      #00c6ff,
      ${COLORS.blue.primary}
    )`,
    borderColor: COLORS.blue.dark,
  },
  dark: {
    background: COLORS.gray.dark,
    backgroundHover: `linear-gradient(
      ${COLORS.gray.primary},
      ${COLORS.gray.dark}
    )`,
    borderColor: COLORS.gray.veryDark,
  },
  light: {
    textColor: COLORS.teal.primary,
    background: COLORS.gray.veryLight,
    backgroundHover: COLORS.white,
    borderColor: COLORS.gray.light,
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
    height: UNITS_IN_PX[3],
    padding: UNITS_IN_PX[2],
    font: '16px',
    borderWidth: '4px',
  },
  large: {
    height: ROW_HEIGHT_PX,
    padding: UNITS_IN_PX[3],
    font: '18px',
    borderWidth: '5px',
  },
};

const propTypes = {
  color: PropTypes.oneOf(Object.keys(buttonColors)).isRequired,
  size: PropTypes.oneOf(Object.keys(buttonSizes)).isRequired,
  href: PropTypes.string,
  external: PropTypes.bool,
};

const defaultProps = {
  color: 'blue',
  size: 'medium',
};

const Button = props => {
  const { href, external, ...delegatedProps } = props;

  // If no href is given, it's a <button>.
  if (!href) {
    return <ButtonElem {...delegatedProps} />;
  }

  // If we have an href, we want to make a link that looks like a button.
  if (href) {
    // Unless the `external` flag is provided, use a Link for fast SPA routing
    return external ? (
      <AnchorButtonElem href={href} {...delegatedProps} />
    ) : (
      <LinkButtonElem to={href} {...delegatedProps} />
    );
  }
};

const buttonStyles = props => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${props.fill ? '100%' : 'auto'};
  height: ${buttonSizes[props.size].height};
  padding: 0 ${buttonSizes[props.size].padding};
  color: ${buttonColors[props.color].textColor || COLORS.white};
  font-size: ${buttonSizes[props.size].font};
  font-weight: bold;
  background: ${buttonColors[props.color].background};
  border: none;
  border-radius: 0px;
  border-bottom-width: ${buttonSizes[props.size].borderWidth};
  border-bottom-style: solid;
  border-bottom-color: ${buttonColors[props.color].borderColor};
  cursor: pointer;
  text-decoration: none;
  text-shadow: 0px 1px 0px ${buttonColors[props.color].background};

  &:hover {
    background: ${buttonColors[props.color].backgroundHover};
  }

  &:disabled {
    background: ${COLORS.gray.primary} !important;
    border-bottom-color: rgba(0, 0, 0, 0.25) !important;
    cursor: not-allowed;
  }
`;

const ButtonElem = styled.button`
  ${buttonStyles};
`;
const AnchorButtonElem = styled.a`
  ${buttonStyles};
`;
const LinkButtonElem = styled(Link)`
  ${buttonStyles};
`;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { COLORS, UNITS_IN_PX } from '../../constants';

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  theme: PropTypes.oneOf(['light', 'dark', 'vibrant', 'vibrantAlt']).isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  size: 'medium',
  theme: 'dark',
};

const Heading = ({ size, children, ...delegated }) =>
  React.createElement(headingComponentMap[size], delegated, children);

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

const getFontColor = ({ color, theme }) => {
  // I try not to use explicit colors, to ensure consistency, but in special places
  // it doesn't make sense to use one of the 3 main themes. A color override can
  // be provided.
  if (color) {
    return color;
  }

  switch (theme) {
    case 'light':
      return COLORS.white;
    case 'vibrant':
      return COLORS.pink.primary;
    case 'vibrantAlt':
      return COLORS.purple.primary;
    case 'dark':
    default:
      return COLORS.gray.veryDark;
  }
};

const headingCSS = css`
  display: block;
  font-weight: bold;
  font-family: 'Raleway';
`;

const HeadingLarge = styled.h2`
  composes: ${headingCSS};
  font-size: 72px;
  letter-spacing: -2px;
  color: ${getFontColor};
`;

const HeadingMedium = styled.h4`
  composes: ${headingCSS};
  font-size: 42px;
  letter-spacing: -1px;
  line-height: 32px;
  margin-bottom: ${UNITS_IN_PX[2]};
  color: ${getFontColor};
`;

const HeadingSmall = styled.h6`
  composes: ${headingCSS};
  font-size: 22px;
  line-height: 18px;
  margin-bottom: ${UNITS_IN_PX[1]};
  color: ${getFontColor};
`;

const headingComponentMap = {
  large: HeadingLarge,
  medium: HeadingMedium,
  small: HeadingSmall,
};

export default Heading;

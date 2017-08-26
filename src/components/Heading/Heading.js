import React from 'react';
import styled from 'emotion/react';
import { css } from 'emotion';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';


const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  children: PropTypes.node
};

const defaultProps = {
  size: 'medium',
  theme: 'dark',
}
const Heading = ({ size, children, ...delegated }) => (
  React.createElement(
    headingComponentMap[size],
    delegated,
    children
  )
);

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

const getFontColor = props => (
  props.theme === 'light' ? COLORS.white : COLORS.gray.veryDark
);

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
  margin-bottom: ${UNITS_IN_PX[2]}
  color: ${getFontColor};
`;

const HeadingSmall = styled.h6`
  composes: ${headingCSS};
  font-size: 22px;
  line-height: 18px;
  color: ${getFontColor};
`;

const headingComponentMap = {
  large: HeadingLarge,
  medium: HeadingMedium,
  small: HeadingSmall,
};


export default Heading;

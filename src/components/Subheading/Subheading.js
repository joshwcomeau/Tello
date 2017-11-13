import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants';

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  size: 'medium',
};

const Subheading = ({ size, children, ...delegated }) =>
  React.createElement(headingComponentMap[size], delegated, children);

Subheading.propTypes = propTypes;
Subheading.defaultProps = defaultProps;

const subheadingCSS = css`
  display: block;
  font-weight: bold;
  text-transform: uppercase;
  webkitfontsmoothing: antialiased;
  color: ${COLORS.gray.primary};
`;

const SubheadingLarge = styled.h2`
  composes: ${subheadingCSS};
  font-size: 42px;
  letter-spacing: -2px;
`;

const SubheadingMedium = styled.h4`
  composes: ${subheadingCSS};
  font-size: 22px;
  letter-spacing: -1px;
  line-height: 32px;
`;

const SubheadingSmall = styled.h6`
  composes: ${subheadingCSS};
  font-size: 12px;
  line-height: 10px;
  margin-top: 5px;
`;

const headingComponentMap = {
  large: SubheadingLarge,
  medium: SubheadingMedium,
  small: SubheadingSmall,
};

export default Subheading;

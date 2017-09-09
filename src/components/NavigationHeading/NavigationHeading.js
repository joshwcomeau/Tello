import React from 'react';
import styled from 'emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';


const propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const NavigationHeading = ({ name, href, isActive }) => (
  <HeadingLink to={href} isActive={isActive}>
    <NavHeading>
      {name}
    </NavHeading>
  </HeadingLink>
);

const HeadingLink = styled(Link)`
  text-decoration: none;
  margin-right: ${UNITS_IN_PX[2]};
  opacity: ${props => props.isActive ? 1 : 0.4};
  transition: 400ms;
  transform: ${props => props.isActive ? 'scale(1)' : 'scale(0.9)'};
  transform-origin: bottom;
  will-change: transform, opacity;
`;

const NavHeading = styled(Heading)`
  margin-bottom: 0;
  color: ${COLORS.white};
`;


NavigationHeading.propTypes = propTypes;

export default NavigationHeading;

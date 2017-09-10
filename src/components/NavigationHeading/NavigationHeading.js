import React from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';


const propTypes = {
  value: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

const NavigationHeading = ({ value, pathname }) => {
  const href = '/' + value;
  const isActive = href === pathname;

  return (
    <HeadingLink to={href}>
      <NavHeading isActive={isActive}>
        {value}
      </NavHeading>
    </HeadingLink>
  );
};

const HeadingLink = styled(Link)`
  text-decoration: none;
  margin-right: ${UNITS_IN_PX[2]};
  transition: 400ms;
  will-change: transform, opacity;
`;

const NavHeading = styled(Heading)`
  margin-bottom: 0;
  text-transform: capitalize;
  color: ${COLORS.white};
  opacity: ${props => props.isActive ? 1 : 0.4};
`;

const mapStateToProps = state => ({
  pathname: state.router.locationBeforeTransitions.pathname,
})


NavigationHeading.propTypes = propTypes;

export default connect(mapStateToProps)(NavigationHeading);

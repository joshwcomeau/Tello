import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';

const propTypes = {
  value: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

const NavigationHeading = ({ value, pathname }) => {
  const href = '/app/' + value;

  // Our /app/summary link is also aliased to the root /app link.
  // TODO: Find a less gross way to do this!
  const isSummaryAlias = value === 'summary' && pathname === '/app';

  const isActive = isSummaryAlias || href === pathname;

  return (
    <HeadingLink to={href}>
      <NavHeading isActive={isActive}>{value}</NavHeading>
    </HeadingLink>
  );
};

const HeadingLink = styled(Link)`
  text-decoration: none;
`;

const NavHeading = styled(Heading)`
  margin-right: ${UNITS_IN_PX[2]};
  margin-bottom: 0;
  text-transform: capitalize;
  color: ${COLORS.white};
  opacity: ${props => (props.isActive ? 1 : 0.4)};
  transition: 400ms;
  will-change: transform, opacity;
`;

const mapStateToProps = state => ({
  pathname: state.router.location ? state.router.location.pathname : '',
});

NavigationHeading.propTypes = propTypes;

export default connect(mapStateToProps)(NavigationHeading);

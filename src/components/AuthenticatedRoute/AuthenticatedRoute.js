import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getToken } from '../../reducers/auth.reducer';

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.func.isRequired,
  ]),
};

const AuthenticatedRoute = ({ authenticated, fallback, ...delegatedProps }) =>
  authenticated ? <Route {...delegatedProps} /> : fallback();

const mapStateToProps = state => ({
  authenticated: !!getToken(state),
});

AuthenticatedRoute.propTypes = propTypes;

export default connect(mapStateToProps)(AuthenticatedRoute);

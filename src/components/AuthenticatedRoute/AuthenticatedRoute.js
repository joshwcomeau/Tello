import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { loadUnauthorizedRoute } from '../../actions';
import { getToken } from '../../reducers/auth.reducer';


const AuthenticatedRoute = ({
  authenticated,
  component,
  fallbackComponent,
  ...delegatedProps
}) => (
  <Route
    {...delegatedProps}
    component={authenticated ? component : fallbackComponent}
  />
);

const mapStateToProps = state => ({
  authenticated: !!getToken(state),
});

export default connect(mapStateToProps)(AuthenticatedRoute);

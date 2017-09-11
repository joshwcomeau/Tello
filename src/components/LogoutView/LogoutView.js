import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'cookies-js';

import { logout } from '../../actions';
import { AUTH_TOKEN_KEY } from '../../constants';


class LogoutView extends PureComponent {
  componentWillMount() {
    Cookies.expire(AUTH_TOKEN_KEY);

    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, { logout })(LogoutView);

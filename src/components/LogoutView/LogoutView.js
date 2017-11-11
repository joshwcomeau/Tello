import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'cookies-js';

import { logout } from '../../actions';
import { AUTH_TOKEN_KEY } from '../../constants';
import { deleteCookie } from '../../utils';

class LogoutView extends PureComponent {
  componentWillMount() {
    if (Cookies.get(AUTH_TOKEN_KEY)) {
      deleteCookie(AUTH_TOKEN_KEY);
      this.props.logout();
    }
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, { logout })(LogoutView);

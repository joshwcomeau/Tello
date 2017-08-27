import React, { Component } from 'react';

import Button from '../Button';

// In development, we need to specify the Node API URL.
// In production, the two are the same, and so this isn't necessary.
// TODO: Better solution!
const hrefPrefix = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3005'
  : '';
const authHref = `${hrefPrefix}/auth/google`;

class Login extends Component {
  render() {
    console.log('Render login')
    return (
      <Button color="red" tag="a" href={authHref}>
        Sign into Google
      </Button>
    );
  }
}

export default Login;

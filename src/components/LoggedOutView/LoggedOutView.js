import React, { Component } from 'react';

import GoogleButton from '../GoogleButton';


class LoggedOutView extends Component {
  render() {
    return (
      <div>
        <h1>Logged Out Homepage</h1>

        <GoogleButton />
      </div>
    );
  }
}

export default LoggedOutView;

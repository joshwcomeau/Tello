import React, { Component } from 'react';

import Button from '../Button';

class Home extends Component {
  render() {
    return (
      <Button color="red" tag="a" href="http://google.com">
        Sign into Google
      </Button>
    );
  }
}

export default Home;

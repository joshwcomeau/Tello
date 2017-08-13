import React, { Component } from 'react';

import Header from '../Header';
import Backlog from '../Backlog';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Spacer size={4} />

        <MaxWidthWrapper>
          <Backlog />
        </MaxWidthWrapper>
      </div>
    );
  }
}

export default App;

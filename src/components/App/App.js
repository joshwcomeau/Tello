import React, { Component } from 'react';

import { ROW_HEIGHT } from '../../constants';

import Header from '../Header';
import Backlog from '../Backlog';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';


class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Spacer size={ROW_HEIGHT} />

        <MaxWidthWrapper>
          <Backlog />
        </MaxWidthWrapper>
      </div>
    );
  }
}

export default App;

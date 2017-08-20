import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { ROW_HEIGHT } from '../../constants';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';

import Backlog from '../Backlog';
import Home from '../Home';


class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Spacer size={ROW_HEIGHT} />

        <MaxWidthWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/backlog" component={Backlog} />
        </MaxWidthWrapper>
      </div>
    );
  }
}

export default App;

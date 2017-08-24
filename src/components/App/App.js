import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { AUTH_TOKEN_KEY, ROW_HEIGHT } from '../../constants';
import { getCookie } from '../../utils';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import Backlog from '../Backlog';
import Home from '../Home';


class App extends Component {
  componentDidMount() {
    // Check if the user has an auth token stored in the cookie.
    const token = getCookie(AUTH_TOKEN_KEY);

    console.log(token);
  }

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

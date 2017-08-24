import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userDataRequest } from '../../actions';
import { AUTH_TOKEN_KEY, ROW_HEIGHT } from '../../constants';
import { getCookie } from '../../utils';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import Backlog from '../Backlog';
import Home from '../Home';


// For our initial mount,
const token = getCookie(AUTH_TOKEN_KEY);

class App extends Component {
  static propTypes = {
    userDataRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { isLoggedIn, userDataRequest } = this.props;

    console.log('MOUNT', this.props);

    if (isLoggedIn) {
      userDataRequest();
    }
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

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { userDataRequest })(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { userDataRequest } from '../../actions';
import { ROW_HEIGHT } from '../../constants';
import { getIsLoggedIn } from '../../reducers/auth.reducer';

import FlashMessage from '../FlashMessage';
import Header from '../Header';
import LeftModal from '../LeftModal';
import RightModal from '../RightModal';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import NavigationHeadings from '../NavigationHeadings';

import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SummaryView from '../SummaryView';

import LoggedOutView from '../LoggedOutView';
import LoginView from '../LoginView';


class App extends Component {
  static propTypes = {
    userDataRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { isLoggedIn, userDataRequest } = this.props;

    if (isLoggedIn) {
      userDataRequest();
    }
  }

  renderLoggedInRoutes() {
    const activeSection = this.props.location.pathname.replace(/^\//, '');

    return (
      <div>
        <NavigationHeadings activeSection={activeSection} />

        <Switch>
          <Route path="/summary" component={SummaryView} />
          <Route path="/backlog" component={BacklogView} />
          <Route path="/calendar" component={CalendarView} />
          <Redirect from="/login" to="/summary" />
          <Redirect from="/" to="/summary" />
        </Switch>
      </div>
    )
  }

  renderLoggedOutRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={LoggedOutView} />
        <Route path="/login" component={LoginView} />
      </Switch>
    )
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <FlashMessage />

        <Header />

        <LeftModal />
        <RightModal />

        <Body>
          <Spacer size={ROW_HEIGHT} />

          <MaxWidthWrapper>
            {
              isLoggedIn
                ? this.renderLoggedInRoutes()
                : this.renderLoggedOutRoutes()
            }
          </MaxWidthWrapper>
        </Body>
      </div>
    );
  }
}

const Body = styled.div`
  position: relative;
  z-index: 1;
`

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default withRouter(
  connect(mapStateToProps, { userDataRequest })(App));

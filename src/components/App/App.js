import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { userDataRequest, hideModal } from '../../actions';
import { Z_INDICES, ROW_HEIGHT } from '../../constants';
import { getIsLoggedIn } from '../../reducers/auth.reducer';

import Confirm from '../Confirm';
import FlashMessage from '../FlashMessage';
import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Modal from '../Modal';
import NavigationHeadings from '../NavigationHeadings';
import Spacer from '../Spacer';

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
    const { isLoggedIn, hideModal } = this.props;

    return (
      <div>
        <FlashMessage />

        <Header />

        <Modal side="left" handleClose={() => hideModal({ side: 'left' })} />
        <Modal side="right" handleClose={() => hideModal({ side: 'right' })} />

        <Confirm isVisible title="Are you sure?">
          Please be advised.
        </Confirm>

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
  z-index: ${Z_INDICES.root};
`

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = { userDataRequest, hideModal };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App));

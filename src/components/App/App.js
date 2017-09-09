import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { userDataRequest, hideModal } from '../../actions';
import { Z_INDICES, ROW_HEIGHT } from '../../constants';
import { isMobile } from '../../helpers/responsive.helpers';
import { getToken, getIsLoggedIn } from '../../reducers/auth.reducer';

import FlashMessage from '../FlashMessage';
import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Modal from '../Modal';
import DesktopNavigation from '../DesktopNavigation';
import Spacer from '../Spacer';
import MediaQuery from '../MediaQuery';

import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SummaryView from '../SummaryView';
import MobileView from '../MobileView';

import LoggedOutView from '../LoggedOutView';
import LoginView from '../LoginView';


class App extends Component {
  static propTypes = {
    hasToken: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    userDataRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { hasToken, userDataRequest } = this.props;

    if (hasToken) {
      userDataRequest();
    }
  }

  renderMobileRoutes() {
    return (
      <Switch>
        <Route path="/mobile" component={MobileView} />
        <Redirect from="/login" to="/mobile" />
        <Redirect from="/" to="/mobile" />
      </Switch>
    );
  }

  renderDesktopRoutes() {
    const activeSection = this.props.location.pathname.replace(/^\//, '');

    return (
      <MaxWidthWrapper>
        <DesktopNavigation activeSection={activeSection} />

        <Switch>
          <Route path="/summary" component={SummaryView} />
          <Route path="/backlog" component={BacklogView} />
          <Route path="/calendar" component={CalendarView} />
          <Redirect from="/login" to="/summary" />
          <Redirect from="/" to="/summary" />
        </Switch>
      </MaxWidthWrapper>
    );
  }

  render() {
    const { hasToken, hideModal } = this.props;

    // If we're not logged in, we pretty much only care about our marketing
    // page. We use `hasToken` instead of `isLoggedIn` to avoid showing
    // the logged-out routes while validating the auth token.
    if (!hasToken) {
      return (
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/" component={LoggedOutView} />
        </Switch>
      )
    }

    // The real magic happens in the logged-in section.
    return [
      <FlashMessage key="flash" />,

      <Header key="header" />,

      <Modal
        key="left-modal"
        side="left"
        handleClose={() => hideModal({ side: 'left' })}
      />,
      <Modal
        key="right-modal"
        side="right"
        handleClose={() => hideModal({ side: 'right' })}
      />,

      <Body key="body">
        <Spacer size={ROW_HEIGHT} />

        <MediaQuery>
          {(breakpoint) => (
            isMobile(breakpoint)
              ? this.renderMobileRoutes()
              : this.renderDesktopRoutes()
          )}
        </MediaQuery>
      </Body>,
    ];
  }
}

const Body = styled.div`
  position: relative;
  z-index: ${Z_INDICES.root};
`

const mapStateToProps = state => ({
  hasToken: !!getToken(state),
  isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = { userDataRequest, hideModal };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App));

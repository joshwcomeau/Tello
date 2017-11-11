import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userDataRequest, hideModal } from '../../actions';
import { getToken } from '../../reducers/auth.reducer';

import FlashMessage from '../FlashMessage';
import Modal from '../Modal';
import MediaQuery from '../MediaQuery';
import Footer from '../Footer';

import AuthenticatedRoute from '../AuthenticatedRoute';
import AppRoutes from '../AppRoutes';
import LogoutView from '../LogoutView';
import LandingPageView from '../LandingPageView';
import PrivacyPolicyView from '../PrivacyPolicyView';
import TermsOfUseView from '../TermsOfUseView';
import AboutView from '../AboutView';
import ContactView from '../ContactView';
import NotFoundView from '../NotFoundView';

class App extends PureComponent {
  static propTypes = {
    hasToken: PropTypes.bool.isRequired,
    userDataRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { hasToken, userDataRequest } = this.props;

    if (hasToken) {
      userDataRequest();
    }
  }

  render() {
    const { hasToken, hideModal } = this.props;

    return (
      <MediaQuery>
        {breakpoint => [
          // Render our fancy particles on desktop, but not on mobile.
          <FlashMessage key="flash" />,

          <Switch key="routes">
            {/*
              Index.
              For new visitors, this loads the marketing landing page.
              For logged-in users, this redirects to the application.
            */}
            {hasToken && <Redirect exact from="/" to="/app" />}
            <Route exact path="/" component={LandingPageView} />

            {/*
              Application.
              There are several sub-routes / a mobile alternative, but this
              is managed by the AppRoutes component.
            */}
            <AuthenticatedRoute
              path="/app"
              render={() => <AppRoutes breakpoint={breakpoint} />}
              fallback={() => <Redirect to="/" />}
            />

            {/* Static routes */}
            <Route path="/privacy" component={PrivacyPolicyView} />
            <Route path="/terms" component={TermsOfUseView} />
            <Route path="/contact" component={ContactView} />
            <Route path="/about" component={AboutView} />

            {/*
              Logout.
              (Not actually a view, just a mechanism to logout)
            */}
            <AuthenticatedRoute path="/logout" component={LogoutView} />

            {/* 404 */}
            <Route component={NotFoundView} />
          </Switch>,

          <Footer key="footer" />,

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
        ]}
      </MediaQuery>
    );
  }
}

const mapStateToProps = state => ({
  hasToken: !!getToken(state),
});

const mapDispatchToProps = { userDataRequest, hideModal };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { userDataRequest, hideModal } from '../../actions';
import { Z_INDICES, ROW_HEIGHT, UNITS_IN_PX } from '../../constants';
import { isMobile } from '../../helpers/responsive.helpers';
import { getToken, getIsFetching } from '../../reducers/auth.reducer';
import { getNoShowsYet } from '../../reducers/tracked-shows.reducer';

import FlashMessage from '../FlashMessage';
import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Modal from '../Modal';
import DesktopNavigation from '../DesktopNavigation';
import Spacer from '../Spacer';
import Spinner from '../Spinner';
import MediaQuery from '../MediaQuery';
import NoShowsYet from '../NoShowsYet';
import FetchEpisodes from '../FetchEpisodes';

import SummaryView from '../SummaryView';
import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SettingsView from '../SettingsView';
import MobileView from '../MobileView';
import LogoutView from '../LogoutView';
import LoggedOutView from '../LoggedOutView';


class App extends PureComponent {
  static propTypes = {
    hasToken: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    noShowsYet: PropTypes.bool.isRequired,
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
    const { isFetching, noShowsYet } = this.props;

    if (isFetching) {
      return (
        <SpinnerWrapper>
          <Spinner size="lg" />
        </SpinnerWrapper>
      )
    }

    if (noShowsYet) {
      return (
        <MaxWidthWrapper>
          <NoShowsYet />
        </MaxWidthWrapper>
      );
    }

    return (
      <MaxWidthWrapper>
        <Spacer size={ROW_HEIGHT} />

        <DesktopNavigation />

        <Switch>
          <Route path="/summary" component={SummaryView} />
          <Route path="/backlog" component={BacklogView} />
          <Route path="/calendar" component={CalendarView} />
          <Route path="/settings" component={SettingsView} />
          <Redirect from="/login" to="/summary" />
          <Redirect from="/" to="/summary" />
        </Switch>
      </MaxWidthWrapper>
    );
  }

  renderLoggedInRoutes() {
    return [
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
        <MediaQuery>
          {(breakpoint) => (
            isMobile(breakpoint)
              ? this.renderMobileRoutes()
              : this.renderDesktopRoutes()
          )}
        </MediaQuery>
      </Body>,

      // Logged-in data component
      <FetchEpisodes key="fetch" />,
    ];
  }

  render() {
    const { hasToken, hideModal } = this.props;

    return [
      <FlashMessage key="flash" />,

      hasToken
        ? this.renderLoggedInRoutes()
        : <Route path="/" component={LoggedOutView} />,

      <Route key="logout" path="/logout" component={LogoutView} />,
    ]
  }
}

const Body = styled.div`
  position: relative;
  z-index: ${Z_INDICES.root};
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${UNITS_IN_PX[6]} 0;
`

const mapStateToProps = state => ({
  hasToken: !!getToken(state),
  isFetching: getIsFetching(state),
  noShowsYet: getNoShowsYet(state),
});

const mapDispatchToProps = { userDataRequest, hideModal };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App));

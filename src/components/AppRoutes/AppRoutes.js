import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { isMobile } from '../../helpers/responsive.helpers';
import { getNoShowsYet } from '../../reducers/tracked-shows.reducer';
import { breakpointsProp } from '../../types';

import Bundle from '../Bundle';
import LoggedInLayout from '../LoggedInLayout';
import SpinnerWithPadding from '../SpinnerWithPadding';

import SummaryView from '../SummaryView';
import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SettingsView from '../SettingsView';
import NoShowsYet from '../NoShowsYet';

import loadMobileView from 'bundle-loader?lazy!../MobileView';

class AppRoutes extends PureComponent {
  static propTypes = {
    breakpoint: breakpointsProp.isRequired,
    noShowsYet: PropTypes.bool.isRequired,
  };

  getMobileRoutes() {
    return [
      <Route
        key="mobile"
        path="/app/mobile"
        render={() => (
          <Bundle load={loadMobileView}>
            {MobileView =>
              MobileView ? <MobileView /> : <SpinnerWithPadding />
            }
          </Bundle>
        )}
      />,
      <Redirect key="redirect" from="/app" to="/app/mobile" />,
      <Redirect key="not-found" to="/404" />,
    ];
  }

  getDesktopRoutes() {
    return [
      <Route exact key="app" path="/app" component={SummaryView} />,
      <Route exact key="sum" path="/app/summary" component={SummaryView} />,
      <Route exact key="bkg" path="/app/backlog" component={BacklogView} />,
      <Route exact key="cal" path="/app/calendar" component={CalendarView} />,
      <Route exact key="set" path="/app/settings" component={SettingsView} />,
      <Redirect key="from-mobile" from="/app/mobile" to="/app" />,
      <Redirect key="not-found" to="/404" />,
    ];
  }

  render() {
    const { breakpoint, noShowsYet } = this.props;

    return (
      <LoggedInLayout showNavLinks={!noShowsYet}>
        <Switch>
          {noShowsYet && <Route component={NoShowsYet} />}

          {isMobile(breakpoint)
            ? this.getMobileRoutes()
            : this.getDesktopRoutes()}
        </Switch>
      </LoggedInLayout>
    );
  }
}

const mapStateToProps = state => ({
  noShowsYet: getNoShowsYet(state),
});

export default withRouter(connect(mapStateToProps)(AppRoutes));

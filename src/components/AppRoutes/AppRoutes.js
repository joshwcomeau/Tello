import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { isMobile } from '../../helpers/responsive.helpers';
import { debounce } from '../../utils';
import { breakpointsProp } from '../../types';

import Bundle from '../Bundle';
import LoggedInLayout from '../LoggedInLayout';
import SpinnerWithPadding from '../SpinnerWithPadding';

import SummaryView from '../SummaryView';
import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SettingsView from '../SettingsView';
import NotFoundView from '../NotFoundView';

import loadMobileView from 'bundle-loader?lazy!../MobileView';


class AppRoutes extends PureComponent {
  static propTypes = {
    breakpoint: breakpointsProp.isRequired,
  }

  getMobileRoutes() {
    return [
      <Route
        key="mobile"
        path="/app/mobile"
        render={() => (
          <Bundle load={loadMobileView}>
            {
              (MobileView) => MobileView
                ? <MobileView />
                : <SpinnerWithPadding />
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
    return (
      <LoggedInLayout>
        <Switch>
          {isMobile(this.props.breakpoint)
            ? this.getMobileRoutes()
            : this.getDesktopRoutes()
          }
        </Switch>

      </LoggedInLayout>
    );

  }
}

export default AppRoutes;

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth.reducer';
import calendar from './calendar.reducer';
import modals from './modals.reducer';
import flash from './flash.reducer';
import trackedShows from './tracked-shows.reducer';
import ui from './ui.reducer';
import mobile from './mobile.reducer';

export default combineReducers({
  auth,
  calendar,
  modals,
  flash,
  trackedShows,
  ui,
  mobile,

  router,
});

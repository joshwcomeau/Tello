import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'

import auth from './auth.reducer';
import modals from './modals.reducer';
import flash from './flash.reducer';
import trackedShows from './tracked-shows.reducer';
import ui from './ui.reducer';


export default combineReducers({ auth, modals, flash, trackedShows, router, ui });

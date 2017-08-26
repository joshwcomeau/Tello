import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'

import auth from './auth.reducer';
import modals from './modals.reducer';
import shows from './shows.reducer';


export default combineReducers({ auth, modals, shows, router });

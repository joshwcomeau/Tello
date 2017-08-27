import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'

import auth from './auth.reducer';
import modals from './modals.reducer';
import shows from './shows.reducer';
import episodes from './episodes.reducer';


export default combineReducers({ auth, modals, shows, episodes, router });

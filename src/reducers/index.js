import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'

import auth from './auth.reducer';
import modals from './modals.reducer';


export default combineReducers({ auth, modals, router });

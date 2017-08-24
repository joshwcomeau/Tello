import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'

import auth from './auth.reducer';


export default combineReducers({ auth, router });

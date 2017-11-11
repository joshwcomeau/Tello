import { combineReducers } from 'redux';

import {
  USER_DATA_RECEIVE,
  USER_DATA_REQUEST,
  USER_DATA_FAILURE,
  LOGOUT,
} from '../actions';
import { isEmpty } from '../utils';

const initialState = {
  token: null,
  isFetching: false,
  user: {},
};

function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_DATA_FAILURE:
    case LOGOUT: {
      return {};
    }

    case USER_DATA_RECEIVE: {
      return {
        id: action.data.id,
        name: action.data.name,
        email: action.data.email,
      };
    }

    default: {
      return state;
    }
  }
}

function isFetchingReducer(state = initialState.isFetching, action) {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return true;

    case USER_DATA_FAILURE:
    case USER_DATA_RECEIVE:
      return false;

    default:
      return state;
  }
}

function tokenReducer(state = initialState.token, action) {
  // We handle login with Google OAuth, and so the login is not part of this app.
  // As such, when Google forwards them back, the redux store is _initialized_
  // with the login token. So there is no action for adding a token.
  switch (action.type) {
    case USER_DATA_FAILURE:
    case LOGOUT:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  token: tokenReducer,
  isFetching: isFetchingReducer,
  user: userReducer,
});

// Selectors
export const getToken = state => state.auth.token;
export const getIsFetching = state => state.auth.isFetching;
export const getUser = state => state.auth.user;

export const getUserFullName = state => state.auth.user.name;

export const getIsLoggedIn = state => !isEmpty(getUser(state));

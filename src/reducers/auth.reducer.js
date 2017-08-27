import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

import {
  EPISODES_RECEIVE,
  START_TRACKING_NEW_SHOWS,
  REMOVE_SHOW,
  TOGGLE_EPISODE,
  USER_DATA_RECEIVE,
  USER_DATA_REQUEST,
  USER_DATA_FAILURE,
} from '../actions';
import { isEmpty } from '../utils';


const initialState = {
  token: null,
  isFetching: false,
  user: {},
};


function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_DATA_RECEIVE: {
      return action.data;
    }

    case START_TRACKING_NEW_SHOWS: {
      // On the server, new shows have an empty `seenEpisodes` array added.
      // Because we fetch straight from TV Maze and don't wait for server
      // confirmation, we have to add this in manually here, so that the
      // data is consistent.
      const shows = action.shows.map(show => ({
        ...show,
        seenEpisodes: [],
      }));

      return update(state, {
        trackedShows: {
          $push: shows,
        },
      });
    }

    case EPISODES_RECEIVE: {

    }

    case REMOVE_SHOW: {
      // TODO
      return state;
    }

    case TOGGLE_EPISODE: {
      // TODO
      return state;
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
  // At the moment, our token doesn't change throughout the session.
  // It's loaded on instantiation, if available.
  // We just store it in a reducer for convenience (and to derive things).
  return state;
}

export default combineReducers({
  token: tokenReducer,
  isFetching: isFetchingReducer,
  user: userReducer,
});


// Selectors
const getToken = state => state.auth.token;
const getIsFetching = state => state.auth.isFetching;
const getUserData = state => state.auth.user;

// This doesn't _really_ tell us if we're logged in;
// It tells us if we're attempting a login, though, so it's safe to
// use for things like redirecting from login-only areas.
export const getIsLoggedIn = state => !!getToken(state);

export const getTrackedShows = createSelector(
  getIsLoggedIn, getUserData,
  (isLoggedIn, userData) => isLoggedIn ? userData.trackedShows : []
);

export const getTrackedShowIds = createSelector(
  getTrackedShows,
  (trackedShows) => trackedShows.map(show => show.id)
);

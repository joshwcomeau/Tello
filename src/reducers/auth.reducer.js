import { createSelector } from 'reselect';
import update from 'immutability-helper';

import {
  START_TRACKING_NEW_SHOWS,
  REMOVE_SHOW,
  TOGGLE_EPISODE,
  USER_DATA_RECEIVE,
} from '../actions';


const initialState = {
  isLoggedIn: false,
  userData: null,
};


const extractUserShows = shows => shows.map(show => ({
  id: show.id,
  seenEpisodes: show.seenEpisodes || [],
}));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA_RECEIVE: {
      return {
        ...state,
        userData: action.data,
      };
    }

    case START_TRACKING_NEW_SHOWS: {
      return update(state, {
        userData: {
          trackedShows: {
            $push: extractUserShows(action.shows),
          },
        },
      });
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

// Selectors
export const getUserData = state => state.auth.userData;
export const getTrackedShows = createSelector(
  getUserData,
  (userData) => userData ? userData.trackedShows : []
);

export const getTrackedShowIds = createSelector(
  getTrackedShows,
  (trackedShows) => trackedShows.map(show => show.id)
);

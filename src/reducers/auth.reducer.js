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


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA_RECEIVE: {
      return {
        ...state,
        userData: action.data,
      };
    }

    case START_TRACKING_NEW_SHOWS: {
      // This action is also used for the `shows` reducer.
      // We want to pluck out the show IDs and store them on the user object.
      const newlyTrackedShows = action.shows.map(show => ({
        id: show.id,
        seenEpisodes: [],
      }));

      return update(state, {
        userData: {
          trackedShows: {
            $push: newlyTrackedShows,
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

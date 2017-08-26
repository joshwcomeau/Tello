import { createSelector } from 'reselect';

import {
  ADD_SHOWS,
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

    case ADD_SHOWS: {
      console.log(action);
      // This action is also used for the `shows` reducer.
      // We want to pluck out the show IDs and store them on the user object.
      const userShows = action.shows.map(show => ({
        id: show.id,
        seenEpisodes: [],
      }));

      return {
        ...state,
        userData: {
          ...state.userData,
          trackedShows: [...state.userData.shows, ...userShows],
        },
      };
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
const getUserData = state => state.userData
const getTrackedShows = createSelector(getUserData, (userData) => (
  userData ? userData.trackedShows : []
));

const getTrackedShowIds = createSelector(getTrackedShows, (trackedShows) => {
  trackedShows.map(show => show.id)
});

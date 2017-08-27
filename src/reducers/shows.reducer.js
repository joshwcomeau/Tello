import { createSelector } from 'reselect';

import {
  START_TRACKING_NEW_SHOWS,
} from '../actions';


const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TRACKING_NEW_SHOWS: {
      return action.shows.reduce((acc, show) => ({
        ...acc,
        [show.id]: show,
      }), state);
    }

    default: {
      return state;
    }
  }
}


// Selectors
export const getShows = state => state.shows;
export const getShowsArray = createSelector(
  getShows,
  (shows) => Object.keys(shows).map(id => shows[id])
);

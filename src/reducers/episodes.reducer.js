import {
  EPISODES_RECEIVE,
} from '../actions';

// Our episodes will be keyed not by ID, but by their parent show's ID:
// { showId1: [episode1, episode2], ...}
const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EPISODES_RECEIVE: {
      // TODO:
      return action.episodes.reduce((acc, episode) => ({
        ...acc,
        [episode.id]: episode,
      }), state);
    }

    default: {
      return state;
    }
  }
}


// Selectors
export const getEpisodes = state => state.episodes;

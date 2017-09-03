import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

import {
  EPISODES_RECEIVE,
  START_TRACKING_NEW_SHOWS,
  REMOVE_SHOW,
  TOGGLE_EPISODE,
  MARK_EPISODE_AS_SEEN,
  MARK_EPISODE_AS_UNSEEN,
  MARK_SEASON_AS_SEEN,
  USER_DATA_RECEIVE,
  USER_DATA_REQUEST,
  USER_DATA_FAILURE,
  DELETE_SHOW_REQUEST,
  DELETE_SHOW_RECEIVE,
  DELETE_SHOW_FAILURE,
} from '../actions';
import { convertArrayToMap, toggleInArray, mergeUnique } from '../utils';


const initialState = {};


export default function trackedShowsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA_RECEIVE: {
      return action.data.trackedShows;
    }

    case START_TRACKING_NEW_SHOWS: {
      // On the server, new shows have an empty `seenEpisodeIds` array added.
      // Because we fetch straight from TV Maze and don't wait for server
      // confirmation, we have to add this in manually here, so that the
      // data is consistent.
      const newShows = action.shows.map(show => ({
        ...show,
        seenEpisodeIds: [],
      }));

      // Convert the state shape so that it's map-like, instead of an array.
      const newShowsMap = convertArrayToMap(newShows);

      return {
        ...state,
        ...newShowsMap,
      };
    }

    case EPISODES_RECEIVE: {
      const { showId, episodes } = action;

      // Convert the list of episodes to a map
      const episodeMap = convertArrayToMap(episodes);

      // Add these episodes to the show
      const show = {
        ...state[showId],
        episodes: episodeMap
      };

      return {
        ...state,
        [showId]: show,
      };
    }

    case REMOVE_SHOW: {
      // TODO
      return state;
    }

    case TOGGLE_EPISODE: {
      const { showId, episodeId } = action;
      const show = state[showId];

      const nextSeenEpisodeIds = toggleInArray(show.seenEpisodeIds, episodeId);

      return update(state, {
        [showId]: {
          seenEpisodeIds: { $set: nextSeenEpisodeIds },
        },
      });
    }

    case MARK_EPISODE_AS_SEEN: {
      const { showId, episodeId } = action;
      const show = state[showId];

      const nextSeenEpisodeIds = [...show.seenEpisodeIds, episodeId];

      return update(state, {
        [showId]: {
          seenEpisodeIds: { $set: nextSeenEpisodeIds },
        },
      });
    }

    case MARK_EPISODE_AS_UNSEEN: {
      const { showId, episodeId } = action;
      const show = state[showId];

      const nextSeenEpisodeIds = show.seenEpisodeIds.filter(seenId => (
        seenId !== episodeId
      ));

      return update(state, {
        [showId]: {
          seenEpisodeIds: { $set: nextSeenEpisodeIds },
        },
      });
    }

    case MARK_SEASON_AS_SEEN: {
      const { showId, episodeIds } = action;
      const show = state[showId];

      const nextSeenEpisodeIds = mergeUnique(show.seenEpisodeIds, episodeIds);

      return update(state, {
        [showId]: {
          seenEpisodeIds: { $set: nextSeenEpisodeIds },
        }
      });
    }

    case DELETE_SHOW_REQUEST: {
      const { showId } = action;

      return update(state, {
        [showId]: {
          attemptingDeletion: { $set: true },
        },
      });
    }

    case DELETE_SHOW_RECEIVE: {
      const { showId } = action;

      // Create a working copy, so that we aren't directly mutating state
      const nextState = { ...state };

      // The server has confirmed the show is deleted. Let's remove it!
      delete nextState[showId];

      return nextState;
    }

    case DELETE_SHOW_FAILURE: {
      const { showId } = action;

      // We don't have to worry about the error message or anything, the
      // `flash` reducer will tackle that. We just need to unset the loading
      // flag.

      return update(state, {
        [showId]: {
          attemptingDeletion: { $set: false },
        },
      });
    }

    default:
      return state;
  }
}



// Helpers
const convertEpisodeMapToArray = ({ episodes, seenEpisodeIds }) => (
  Object.keys(episodes).map(episodeId => ({
    ...episodes[episodeId],
    isSeen: seenEpisodeIds.includes(Number(episodeId)),
  }))
);

const organizeEpisodesBySeason = ({ episodes, seenEpisodeIds }) => {
  if (!episodes) {
    return {};
  }

  if (!Array.isArray(episodes)) {
    episodes = convertEpisodeMapToArray({ episodes, seenEpisodeIds });
  }

  return episodes.reduce((acc, episode) => {
    if (!acc[episode.season]) {
      acc[episode.season] = [];
    }

    acc[episode.season].push(episode);

    return acc;
  }, {});
};

// Selectors
export const getTrackedShows = state => state.trackedShows;
export const getTrackedShow = (state, showId) => getTrackedShows(state)[showId];

export const getTrackedShowWithSeasons = (state, showId) => {
  const show = getTrackedShow(state, showId);

  // The user can delete shows. Gotta guard against that.
  if (!show) {
    return null;
  }

  // Initially, we won't have the episodes. They're fetched externally.
  if (!show.episodes) {
    return show;
  }

  return {
    ...show,
    seasons: organizeEpisodesBySeason(show),
  };
}

export const getTrackedShowIds = createSelector(
  getTrackedShows,
  (shows) => Object.keys(shows)
);

export const getTrackedShowsArray = createSelector(
  getTrackedShows,
  getTrackedShowIds,
  (shows, showIds) => showIds.map(showId => {
    const show = shows[showId];

    // If ths show has no episodes, no further array-making is required.
    if (!show.episodes) {
      return show;
    }

    // If the show has episodes, though, we need to turn the episode map
    // into an array as well.
    const episodes = convertEpisodeMapToArray(show);

    return {
      ...show,
      episodes,
    };
  })
);

export const getTrackedShowsArrayWithSeasons = createSelector(
  getTrackedShowsArray,
  (shows) => shows.map(show => ({
    ...show,
    seasons: organizeEpisodesBySeason(show),
  }))
);

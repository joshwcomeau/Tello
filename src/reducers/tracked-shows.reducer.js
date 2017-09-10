import { createSelector } from 'reselect';
import update from 'immutability-helper';
import isFuture from 'date-fns/is_future';
import compareAsc from 'date-fns/compare_asc';

import {
  EPISODES_RECEIVE,
  ADD_SHOWS_RECEIVE,
  REMOVE_SHOW,
  TOGGLE_EPISODE,
  MARK_EPISODE_AS_SEEN,
  MARK_EPISODE_AS_UNSEEN,
  MARK_SEASON_AS_SEEN,
  USER_DATA_RECEIVE,
  DELETE_SHOW_RECEIVE,
} from '../actions';
import { convertArrayToMap, toggleInArray, mergeUnique } from '../utils';
import { getIsFetching } from './auth.reducer';


const initialState = {};


export default function trackedShowsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA_RECEIVE: {
      return action.data.trackedShows;
    }

    case ADD_SHOWS_RECEIVE: {
      // Convert the state shape so that it's map-like, instead of an array.
      const newShowsMap = convertArrayToMap(action.shows);

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

    case DELETE_SHOW_RECEIVE: {
      const { showId } = action;

      // Create a working copy, so that we aren't directly mutating state
      const nextState = { ...state };

      // The server has confirmed the show is deleted. Let's remove it!
      delete nextState[showId];

      return nextState;
    }

    default:
      return state;
  }
}



// Helpers
const convertEpisodeMapToArray = ({ episodes, seenEpisodeIds }) => (
  Object.keys(episodes)
    .map(episodeId => ({
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

  // Sort the episodes by their season/episode number.
  episodes = episodes.slice().sort((ep1, ep2) => (
    compareAsc(ep1.airstamp, ep2.airstamp)
  ));

  return episodes.reduce((acc, episode) => {
    if (!acc[episode.season]) {
      acc[episode.season] = [];
    }

    acc[episode.season].push(episode);

    return acc;
  }, {});
};

// Selectors
// NOTE: These selectors are kind of a mess.
// I should really normalize episodes from shows, which would clean up a lot
// of this stuff, at the expense of having to do a lot of server-client
// data munging.
export const getTrackedShows = state => state.trackedShows;

export const getTrackedShowIds = createSelector(
  getTrackedShows,
  (shows) => Object.keys(shows).map(Number)
);

export const getNoShowsYet = createSelector(
  getTrackedShowIds,
  getIsFetching,
  (showIds, isFetching) => !isFetching && showIds.length === 0
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

export const getAiredTrackedShowsArray = createSelector(
  getTrackedShowsArray,
  (shows) => shows.map(show => ({
    ...show,
    episodes: show.episodes
      ? show.episodes.filter(episode => !isFuture(episode.airstamp))
      : undefined,
  }))
);

export const getTrackedShowsWithUnseenEpisodesArray = createSelector(
  getAiredTrackedShowsArray,
  (shows) => shows.filter(show => {
    // If we don't yet have the episode data, we need to include this show.
    if (!show.episodes) {
      return true;
    }

    const numOfUnseenEpisodes = show.episodes.reduce((sum, episode) => (
      sum + (episode.isSeen ? 0 : 1)
    ), 0);

    return numOfUnseenEpisodes > 0;
  })
);


export const getTrackedShowsArrayWithSeasons = createSelector(
  getTrackedShowsArray,
  (shows) => shows.map(show => ({
    ...show,
    seasons: organizeEpisodesBySeason(show),
  }))
);

export const getAiredTrackedShowsArrayWithSeasons = createSelector(
  getAiredTrackedShowsArray,
  (shows) => shows.map(show => ({
    ...show,
    seasons: organizeEpisodesBySeason(show),
  }))
);

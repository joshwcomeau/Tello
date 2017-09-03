import Cookies from 'cookies-js';

import {
  USER_DATA_REQUEST,
  START_TRACKING_NEW_SHOWS,
  EPISODES_REQUEST,
  MARK_EPISODE_AS_SEEN,
  MARK_EPISODE_AS_UNSEEN,
  MARK_SEASON_AS_SEEN,
  TOGGLE_EPISODE,
  userDataReceive,
  userDataFailure,
  failureSyncingNewShows,
  episodesReceive,
} from '../actions';
import { AUTH_TOKEN_KEY } from '../constants';
import { formatEpisodeResults } from '../helpers/tv-maze.helpers';
import {
  getAuthUserData,
  postNewlyTrackedShows,
  getEpisodesForShow,
  patchEpisodes,
} from '../services/api.service';



export default function createAPIMiddleware() {
  return store => next => action => {
    // Fetch the user's token from the cookie. If no cookie is found, they
    // must be logged out, and shouldn't be interacting with our API.
    const token = Cookies.get(AUTH_TOKEN_KEY);

    switch (action.type) {
      case USER_DATA_REQUEST: {
        getAuthUserData({ token })
          .then(json => {
            next(userDataReceive(json));
          })
          .catch(err => {
            console.error("CAUGHT ERROR IN USER DATA", err)
            // If there was an error, let's delete the locally-stored
            // cookie. This forces the user to attempt to login again,
            // which should hopefully fix whatever caused the error.
            // Cookies.expire(AUTH_TOKEN_KEY);

            // Dispatch a failure action so an error can be shown to
            // the user.
            next(userDataFailure(err));
          });
        break;
      }

      case START_TRACKING_NEW_SHOWS: {
        // We don't actually care about the server response (the point of this
        // call is just to sync the server with what the user's selected on
        // the client). Only worry if the server bows up.
        postNewlyTrackedShows({ token, shows: action.shows })
          .catch(err => {
            console.error('Could not persist new tracked shows', err);

            next(failureSyncingNewShows({ shows: action.shows }));
          })

        break;
      }

      case EPISODES_REQUEST: {
        getEpisodesForShow({ showId: action.showId })
          .then(formatEpisodeResults)
          .then(episodes => {
            next(episodesReceive({ showId: action.showId, episodes }));
          });

        break;
      }

      case MARK_EPISODE_AS_SEEN: {
        patchEpisodes({
          token,
          markAs: 'seen',
          showId: action.showId,
          episodeIds: [action.episodeId],
        });

        break;
      }

      case MARK_EPISODE_AS_UNSEEN: {
        patchEpisodes({
          token,
          markAs: 'unseen',
          showId: action.showId,
          episodeIds: [action.episodeId],
        });

        break;
      }

      case TOGGLE_EPISODE: {
        const { showId, episodeId } = action;

        const state = store.getState();
        const show = state.trackedShows[showId];

        const markAs = show.seenEpisodeIds.includes(episodeId)
          ? 'unseen'
          : 'seen';

        patchEpisodes({
          token,
          markAs,
          showId,
          episodeIds: [episodeId],
        });

        break;
      }

      case MARK_SEASON_AS_SEEN: {

      }

      default:
        // No action needed by default.
        break;
    }

    // Regardless of what happens in the above `switch`, we always want to pass
    // the initial action along, for any optimistic/loading UI states.
    next(action);
  }
}

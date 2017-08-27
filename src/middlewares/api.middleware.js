import Cookies from 'cookies-js';

import {
  USER_DATA_REQUEST,
  START_TRACKING_NEW_SHOWS,
  EPISODES_REQUEST,
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
} from '../services/api.service';



export default function createAPIMiddleware() {
  return store => next => action => {
    // Pass the initial action along, for any optimistic or loading UI updates
    next(action);

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
            // If there was an error, let's delete the locally-stored
            // cookie. This forces the user to attempt to login again,
            // which should hopefully fix whatever caused the error.
            Cookies.expire(AUTH_TOKEN_KEY);

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
      }

      case EPISODES_REQUEST: {
        getEpisodesForShow({ showId: action.showId })
          .then(formatEpisodeResults)
          .then(episodes => {
            next(episodesReceive({ episodes }));
          });
      }

      default:
        // No action needed by default.
        break;
    }
  }
}

import {
  USER_DATA_REQUEST,
  userDataReceive,
  userDataFailure,
} from '../actions';
import { getCookie } from '../utils';
import { AUTH_TOKEN_KEY } from '../constants';
import { getAuthUserData } from '../services/api.service';



export default function createAPIMiddleware() {
  return store => next => action => {
    // Pass the initial action along, for any optimistic or loading UI updates
    next(action);

    // Fetch the user's token from the cookie. If no cookie is found, they
    // must be logged out, and shouldn't be interacting with our API.
    const token = getCookie(AUTH_TOKEN_KEY);

    switch (action.type) {
      case USER_DATA_REQUEST: {
        getAuthUserData(token)
          .then(json => {
            next(userDataReceive(json));
          })
          .catch(err => {
            next(userDataFailure(err));
          });
        break;
      }

      default:
        // No action needed by default.
        break;
    }
  }
}

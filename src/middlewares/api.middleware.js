import {
  USER_DATA_REQUEST,
  userDataReceive,
  userDataFailure,
} from '../actions';
import { getAuthUserData } from '../services/api.service';


export default function createAPIMiddleware() {
  return store => next => action => {
    // Pass the initial action along, for any optimistic or loading UI updates
    next(action);

    switch (action.type) {
      case USER_DATA_REQUEST: {
        getAuthUserData()
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

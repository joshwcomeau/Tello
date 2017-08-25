import {
  ADD_SHOW,
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

    case ADD_SHOW: {
      // TODO
      return state;
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

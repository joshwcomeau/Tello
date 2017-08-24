import {
  ADD_SHOW,
  REMOVE_SHOW,
  TOGGLE_EPISODE,
} from '../actions';


const initialState = {
  isLoggedIn: false,
  userData: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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

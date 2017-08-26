import {
  ADD_SHOWS,
} from '../actions';


const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SHOWS: {
      return [...state, ...action.shows];
    }

    default: {
      return state;
    }
  }
}

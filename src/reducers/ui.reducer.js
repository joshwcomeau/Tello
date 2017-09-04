import { CHANGE_SORTING } from '../actions';

const initialState = {
  sorting: 'alpha',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SORTING:
      return {...state, sorting: action.sorting};

    default:
      return state;
  }
}

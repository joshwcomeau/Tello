import { SHOW_MODAL, HIDE_MODAL } from '../actions';

const initialState = {
  left: null,
  right: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        [action.side]: {
          id: action.id,
          data: action.data,
        },
      };
    }

    case HIDE_MODAL: {
      return {
        ...state,
        [action.side]: null,
      };
    }

    default:
      return state;
  }
}

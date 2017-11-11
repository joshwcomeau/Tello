import { SWIPE_MOBILE_VIEW, TAP_SWIPE_INDICATOR } from '../actions';

const initialState = {
  hasSeenSwipeIndicator: false,
  activeViewIndex: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SWIPE_MOBILE_VIEW:
      return {
        ...state,
        activeViewIndex: action.index,
        hasSeenSwipeIndicator: true,
      };

    case TAP_SWIPE_INDICATOR:
      return {
        ...state,
        hasSeenSwipeIndicator: true,
      };

    default:
      return state;
  }
}

import { UPDATE_CALENDAR_WEEK } from '../actions';


// NOTE: Actual initial state comes from src/index.js, where it's set to be
// the start and end of the current week.
const initialState = {
  startDate: null,
  endDate: null,
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CALENDAR_WEEK: {
      return {
        startDate: action.startDate,
        endDate: action.endDate,
      };
    }

    default:
      return state;
  }
}

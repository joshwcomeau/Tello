import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import { UPDATE_CALENDAR_WEEK } from '../actions';

const initialState = {
  startDate: startOfWeek(new Date()),
  endDate: endOfWeek(new Date()),
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

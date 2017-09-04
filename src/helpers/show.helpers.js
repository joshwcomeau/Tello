import format from 'date-fns/format';

import { SORT_OPTIONS } from '../constants';


export const sortShows = ({ shows, sorting }) => (
  shows.sort((show1, show2) => {
    if (sorting === SORT_OPTIONS.alpha) {
      return show1.name < show2.name ? -1 : 1;
    }

    if (sorting === SORT_OPTIONS.chrono) {
      return show1.createdAt > show2.createdAt ? -1 : 1;
    }
  })
);

export const getHumanizedAirDate = show => format(show.airstamp, 'MMM Do, YYYY');

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

    throw new Error('Unrecognized sorting!')
  })
);

export const getHumanizedEpisodeAirDate = ({ airstamp }) => (
  format(airstamp, 'MMM Do, YYYY')
);

export const getEpisodeNumString = ({ season, number }) => (
  `S${String(season).padStart(2, '0')}E${String(number).padStart(2, '0')}`
);

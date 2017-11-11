import compareAsc from 'date-fns/compare_asc';
import format from 'date-fns/format';

import { SORT_OPTIONS } from '../constants';

const getNewestEpisodeAirDate = ({ episodes }) => {
  // If the show hasn't yet populated its episode list, or if the
  // show is pre-release and has no episodes, return the lowest possible
  // value so that it's sorted at the bottom.
  if (!episodes || episodes.length === 0) {
    return -Infinity;
  }

  // Our selector should have already sorted the episodes by their
  // airstamp, and so we just need to take the last one.
  return episodes[episodes.length - 1].airstamp;
};

export const sortShows = ({ shows, sorting }) =>
  shows.sort((show1, show2) => {
    switch (sorting) {
      case SORT_OPTIONS.alpha:
        return show1.name < show2.name ? -1 : 1;

      case SORT_OPTIONS.dateAdded:
        return show1.createdAt > show2.createdAt ? -1 : 1;

      case SORT_OPTIONS.episodeAirDate:
        return getNewestEpisodeAirDate(show1) < getNewestEpisodeAirDate(show2);

      default: {
        // It's possible the user has an outdated sort key stored in
        // localstorage. If we throw an error, we'll break things for
        // them!
        console.warn(
          `Sort key ${sorting} not recognized. Defaulting to Date Added.`
        );

        return sortShows({ shows, sorting: SORT_OPTIONS.dateAdded });
      }
    }
  });

const getSortableEpisodeString = ({ season, number }) => {
  return season * 1000 + number;
};
export const sortEpisodesComparator = (ep1, ep2) => {
  // Most shows can simply be sorted by air date, but some Netflix shows
  // are all released at exactly the same time. In those cases, sort by
  // episode number.
  if (ep1.airstamp === ep2.airstamp) {
    const ep1String = getSortableEpisodeString(ep1);
    const ep2String = getSortableEpisodeString(ep2);

    if (ep1String === ep2String) {
      return 0;
    }

    return ep1String > ep2String ? 1 : -1;
  }

  return compareAsc(ep1.airstamp, ep2.airstamp);
};

export const getHumanizedEpisodeAirDate = ({ airstamp }) =>
  format(airstamp, 'MMM Do, YYYY');

export const getEpisodeNumString = ({ season, number }) =>
  `S${String(season).padStart(2, '0')}E${String(number).padStart(2, '0')}`;

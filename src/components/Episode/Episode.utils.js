import format from 'date-fns/format';

export const getEpisodeNumString = (season, episode) => (
  `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`
);

export const formatDate = date => format(date, 'MMM Do, YYYY');

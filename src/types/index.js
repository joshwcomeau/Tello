import PropTypes from 'prop-types';

export const Episode = PropTypes.shape({
  id: PropTypes.number.isRequired,
  airdate: PropTypes.string.isRequired,
  isSeen: PropTypes.bool,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  season: PropTypes.number.isRequired,
});

export const ShowProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  region: PropTypes.string,
  seenEpisodeIds: PropTypes.arrayOf(PropTypes.number),
  status: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  episodes: PropTypes.arrayOf(Episode),
});

import PropTypes from 'prop-types';

export const ShowProps = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

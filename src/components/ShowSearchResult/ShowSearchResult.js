import React from 'react';
import PropTypes from 'prop-types';

import placeholderImage from '../../images/placeholder.png';


const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

const defaultProps = {
  image: placeholderImage,
};


const ShowSearchResult = ({ id, name, image, status, type, summary }) => (
  <div>
    {name}
  </div>
)

ShowSearchResult.propTypes = propTypes;
ShowSearchResult.defaultProps = defaultProps

export default ShowSearchResult;

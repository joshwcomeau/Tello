import React from 'react';
import PropTypes from 'prop-types';

import placeholderImage from '../../images/placeholder.png';


const propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

const defaultProps = {
  src: placeholderImage,
};

const ShowImage = ({ name, src }) => (
  <img
    src={src}
    alt={name}
    style={{ height: '100%' }}
  />
);

ShowImage.propTypes = propTypes;
ShowImage.defaultProps = defaultProps;

export default ShowImage;

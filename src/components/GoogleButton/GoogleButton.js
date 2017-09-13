import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';


// In development, we need to specify the Node API URL.
// In production, the two are the same, and so this isn't necessary.
// TODO: Better solution!
const hrefPrefix = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3005'
  : '';
const authHref = `${hrefPrefix}/auth/google`;

const propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  color: 'red',
  size: 'medium',
  children: 'Login With Google',
};

const GoogleButton = ({ color, size, children }) => (
  <Button external href={authHref} color={color} size={size}>
    {children}
  </Button>
);

GoogleButton.propTypes = propTypes;
GoogleButton.defaultProps = defaultProps;

export default GoogleButton;

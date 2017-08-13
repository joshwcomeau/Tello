import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { UNITS_IN_PX } from '../../constants';


const propTypes = {
  size: PropTypes.number.isRequired,
};

const defaultProps = {
  size: 2,
};

const Spacer = styled.div`
  position: relative;
  height: ${props => UNITS_IN_PX[props.size]};
`;

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;

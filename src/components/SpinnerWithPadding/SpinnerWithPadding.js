import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { UNITS_IN_PX } from '../../constants';

import Spinner from '../Spinner';

const propTypes = {
  paddingUnits: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
};
const defaultProps = {
  paddingUnits: 6,
  size: 'large',
};

const SpinnerWithPadding = ({ paddingUnits, size }) => {
  return (
    <SpinnerWrapper paddingUnits={paddingUnits}>
      <Spinner size={size} />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${props => UNITS_IN_PX[props.paddingUnits]};
  padding-bottom: ${props => UNITS_IN_PX[props.paddingUnits]};
`;

SpinnerWithPadding.propTypes = propTypes;
SpinnerWithPadding.defaultProps = defaultProps;

export default SpinnerWithPadding;

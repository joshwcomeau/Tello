import PropTypes from 'prop-types';
import styled from 'emotion/react';

import {
  BREAKPOINTS,
  BREAKPOINT_SIZES,
  UNITS_IN_PX,
  MAX_WIDTH
} from '../../constants';


const propTypes = {
  noPadding: PropTypes.bool,
};

const MaxWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || MAX_WIDTH.base};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => props.noPadding ? 0 : UNITS_IN_PX[2]};
  padding-right: ${props => props.noPadding ? 0 : UNITS_IN_PX[2]};

  @media ${BREAKPOINTS.sm} {
    max-width: 100%;
  }

  @media ${BREAKPOINTS.lg} {
    max-width: ${BREAKPOINT_SIZES.md + 'px'};
  }
`;

MaxWidthWrapper.propTypes = propTypes;

export default MaxWidthWrapper

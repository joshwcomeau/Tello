import styled from 'emotion/react';

import {
  BREAKPOINTS,
  BREAKPOINT_SIZES,
  UNITS_IN_PX,
  MAX_WIDTH
} from '../../constants';


export default styled.div`
  position: relative;
  width: 100%;
  max-width: ${MAX_WIDTH.base};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${UNITS_IN_PX[2]};
  padding-right: ${UNITS_IN_PX[2]};

  @media ${BREAKPOINTS.sm} {
    max-width: 100%;
  }

  @media ${BREAKPOINTS.lg} {
    max-width: ${BREAKPOINT_SIZES.md + 'px'};
  }
`;

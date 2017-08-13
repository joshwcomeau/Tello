import styled from 'emotion/react';

import { BREAKPOINTS, UNITS_IN_PX, MAX_WIDTH } from '../../constants';


export default styled.div`
  position: relative;
  width: 100%;
  max-width: ${MAX_WIDTH.base};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${UNITS_IN_PX[2]};
  padding-right: ${UNITS_IN_PX[2]};

  @media ${BREAKPOINTS.sm} {
    max-width: ${MAX_WIDTH.sm}
  }

  @media ${BREAKPOINTS.md} {
    max-width: ${MAX_WIDTH.md}
  }
`;

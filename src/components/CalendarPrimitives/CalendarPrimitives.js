import styled from 'react-emotion';

import { COLORS, UNIT } from '../../constants';

const ROW_HEIGHT_PX = UNIT * 3.5 + 'px';

export const Row = styled.div`
  display: flex;
  height: ${ROW_HEIGHT_PX};
  border-bottom: 1px solid ${COLORS.gray.light};

  &:first-of-type {
    /*
      Our first row is the header row, and it's narrower.
      Not using a standard unit size, but I don't think it matters.
    */
    height: 50px;
    border-bottom: 3px solid ${COLORS.gray.primary};
  }
`;

export const Cell = styled.div`
  overflow: hidden;
  flex: 1;
  border-right: 1px solid ${COLORS.gray.light};

  &:first-of-type {
    flex-grow: initial;
    flex-basis: ${UNIT * 11 + 'px'};
    border-right: 1px solid ${COLORS.gray.primary};
  }

  &:last-of-type {
    border-right: none;
  }
`;

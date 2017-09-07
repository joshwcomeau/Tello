import React from 'react';
import styled from 'emotion/react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

import { COLORS, HALF_UNIT_PX } from '../../constants';

import Cell from '../Cell';


const CalendarHeaderCell = ({ blank, date, row, col }) => (
  <HeaderCell
    row={row}
    col={col}
    highlight={isToday(date)}
  >
    {!blank && [
      <Weekday key="week">{format(date, 'dddd')}</Weekday>,
      <CalendarDate key="date">{format(date, 'MMM Do')}</CalendarDate>
    ]}
  </HeaderCell>
);

const getBackground = ({ highlight }) => highlight
  ? `linear-gradient(to top, ${COLORS.highlight.dark}, rgba(0,0,0,0))`
  : 'transparent'

const HeaderCell = styled(Cell)`
  position: relative;
  padding: ${HALF_UNIT_PX};
  border-bottom: 3px solid ${COLORS.gray.primary};
  background: ${getBackground};

  &:before {
    content: '';
    position: absolute;
    width: ${props => props.col === 8 ? 0 : '1px'};
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      ${COLORS.gray.light},
      ${COLORS.white}
    );
  }
`;

const Weekday = styled.div`
  font-size: 12px;
  color: ${COLORS.purple.primary};
`;

const CalendarDate = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${COLORS.gray.veryDark};
`;

export default CalendarHeaderCell;

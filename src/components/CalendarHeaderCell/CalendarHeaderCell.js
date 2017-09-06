import React from 'react';
import styled from 'emotion/react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';

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

const HeaderCell = styled(Cell)`
  position: relative;
  padding: ${HALF_UNIT_PX};
  border-bottom: 3px solid ${COLORS.gray.primary};
  background: ${props => props.highlight
    ? 'linear-gradient(to top, rgba(255,255,255,0.06), rgba(255,255,255,0))'
    : 'transparent'
  };

  &:before {
    content: '';
    position: absolute;
    width: ${props => props.col === 8 ? 0 : '1px'};
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      ${COLORS.gray.dark},
      ${COLORS.gray.veryDark}
    );
  }
`;

const Weekday = styled.div`
  font-size: 12px;
  color: ${COLORS.cyan.primary};
`;

const CalendarDate = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${COLORS.white};
`;

export default CalendarHeaderCell;

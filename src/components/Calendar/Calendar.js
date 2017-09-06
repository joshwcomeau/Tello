import React, { PureComponent } from 'react';
import styled from 'emotion/react';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import addDays from 'date-fns/add_days';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';

import CalendarRow from '../CalendarRow';
import CalendarHeaderCell from '../CalendarHeaderCell';
import CalendarWeekPicker from '../CalendarWeekPicker';
import Cell from '../Cell';


class Calendar extends PureComponent {
  state = {
    startDate: startOfWeek(new Date()),
    endDate: endOfWeek(new Date()),
  }

  render() {
    const { shows } = this.props;
    const { startDate, endDate } = this.state;

    console.log(startDate)

    return [
      <CalendarHeader key="header">
        <CalendarWeekPicker startDate={startDate} />
      </CalendarHeader>,

      <CalendarGrid key="grid">
        <CalendarHeaderCell blank row={1} col={1} />
        <CalendarHeaderCell date={startDate} row={1} col={2} />
        <CalendarHeaderCell date={addDays(startDate, 1)} row={1} col={3} />
        <CalendarHeaderCell date={addDays(startDate, 2)} row={1} col={4} />
        <CalendarHeaderCell date={addDays(startDate, 3)} row={1} col={5} />
        <CalendarHeaderCell date={addDays(startDate, 4)} row={1} col={6} />
        <CalendarHeaderCell date={addDays(startDate, 5)} row={1} col={7} />
        <CalendarHeaderCell date={addDays(startDate, 6)} row={1} col={8} />
        <Cell row={1} col={9} />

        {shows.map((show, index) => (
          <CalendarRow
            show={show}
            row={index + 2 /* Account for zero-index + header row */}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </CalendarGrid>
    ];
  }
}

const CalendarHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${UNITS_IN_PX[1]};
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr) 0.35fr;
`;


export default Calendar;

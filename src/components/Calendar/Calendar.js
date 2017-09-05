import React, { PureComponent } from 'react';
import styled from 'emotion/react';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';

import CalendarRow from '../CalendarRow';


class Calendar extends PureComponent {
  state = {
    startDate: startOfWeek(new Date()),
    endDate: endOfWeek(new Date()),
  }

  render() {
    const { shows } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <CalendarGrid>
        <Cell row={1} col={1}>X</Cell>
        <Cell row={1} col={2}>Sun</Cell>
        <Cell row={1} col={3}>Mon</Cell>
        <Cell row={1} col={4}>Tue</Cell>
        <Cell row={1} col={5}>Wed</Cell>
        <Cell row={1} col={6}>Thu</Cell>
        <Cell row={1} col={7}>Fri</Cell>
        <Cell row={1} col={8}>Sat</Cell>

        {shows.map((show, index) => (
          <CalendarRow
            show={show}
            rowNum={index + 2 /* Account for zero-index + header row */}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </CalendarGrid>
    );
  }
}

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
`;

const Header = styled.header`
  position: relative;
`;

const Cell = styled.div`
  grid-column-start: ${props => props.col};
  grid-row-start: ${props => props.row};
`;

export default Calendar;

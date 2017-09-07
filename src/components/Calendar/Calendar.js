import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';
import addDays from 'date-fns/add_days';
import PropTypes from 'prop-types';

import { UNITS_IN_PX } from '../../constants';
import { ShowProps } from '../../types';

import CalendarRow from '../CalendarRow';
import CalendarHeaderCell from '../CalendarHeaderCell';
import CalendarCornerCell from '../CalendarCornerCell';
import Cell from '../Cell';


class Calendar extends PureComponent {
  static PropTypes = {
    shows: PropTypes.arrayOf(ShowProps),
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }

  render() {
    const { shows, startDate, endDate } = this.props;

    return (
      <CalendarGrid>
        <CalendarCornerCell row={1} col={1} />
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
            key={show.id}
            show={show}
            row={index + 2 /* Account for zero-index + header row */}
            startDate={startDate}
            endDate={endDate}
            isLastRow={index === shows.length - 1}
          />
        ))}
      </CalendarGrid>
    );
  }
}

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
  background: white;
  padding: ${UNITS_IN_PX[1]}
`;

const mapStateToProps = state => ({
  startDate: state.calendar.startDate,
  endDate: state.calendar.endDate,
});

export default connect(mapStateToProps)(Calendar);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';
import addDays from 'date-fns/add_days';
import PropTypes from 'prop-types';

import { HALF_UNIT_PX } from '../../constants';
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

  componentDidMount() {
    // NOTE: We need to stop propagation on the touch events, so that the
    // parent container's swipe doesn't make the calendar unusable on mobile.
    // Sadly, we can't just use React events like `onTouchStart` because of
    // React's synthetic event system; it fires too late.
    // Need to use the native event system.
    this.elem.addEventListener('touchstart', ev => ev.stopPropagation());
    this.elem.addEventListener('touchmove', ev => ev.stopPropagation());
  }

  render() {
    const { shows, startDate, endDate } = this.props;

    return (
      <Wrapper>
        <CalendarGrid innerRef={elem => this.elem = elem}>
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
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  padding: ${HALF_UNIT_PX};
  background: white;
  overflow: auto;
`
const CalendarGrid = styled.div`
  min-width: 800px;
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
`;

const mapStateToProps = state => ({
  startDate: state.calendar.startDate,
  endDate: state.calendar.endDate,
});

export default connect(mapStateToProps)(Calendar);

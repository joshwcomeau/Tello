import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';
import addDays from 'date-fns/add_days';
import PropTypes from 'prop-types';

import { episodesRequest } from '../../actions';
import { HALF_UNIT_PX } from '../../constants';
import { isBetween } from '../../utils';
import { ShowProps } from '../../types';

import CalendarRow from '../CalendarRow';
import CalendarHeaderCell from '../CalendarHeaderCell';
import CalendarCornerCell from '../CalendarCornerCell';
import Cell from '../Cell';
import StopTouchPropagation from '../StopTouchPropagation';


class Calendar extends PureComponent {
  static PropTypes = {
    shows: PropTypes.arrayOf(ShowProps),
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }

  render() {
    const { shows, startDate, endDate } = this.props;

    // Filter out any shows that don't have episodes yet.
    const relevantShows = shows.filter(show => {
      if (!show.episodes) {
        return false;
      }

      return show.episodes.some(episode => (
        isBetween({ date: episode.airstamp,  startDate, endDate })
      ));
    });

    return (
      <Wrapper>
        <StopTouchPropagation>
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

            {relevantShows.map((show, index) => (
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
        </StopTouchPropagation>
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
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
  min-width: 800px;
`;

const mapStateToProps = state => ({
  startDate: state.calendar.startDate,
  endDate: state.calendar.endDate,
});

export default connect(mapStateToProps, { episodesRequest })(Calendar);

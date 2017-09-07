import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import PropTypes from 'prop-types';
import addWeeks from 'date-fns/add_weeks';

import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Calendar from '../Calendar';
import CalendarWeekPicker from '../CalendarWeekPicker';


class CalendarView extends Component {
  static propTypes = {
    trackedShows: PropTypes.arrayOf(ShowProps),
  }

  render() {
    return [
      <CalendarHeader key="header">
        <CalendarWeekPicker maxDate={addWeeks(new Date(), 2)} />
      </CalendarHeader>,

      <Calendar key="calendar" shows={this.props.trackedShows} />
    ];
  }
}

const CalendarHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const mapStateToProps = state => ({
  trackedShows: getTrackedShowsArray(state),
});

export default connect(mapStateToProps)(CalendarView);

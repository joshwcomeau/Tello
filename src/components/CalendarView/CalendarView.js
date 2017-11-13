import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import addWeeks from 'date-fns/add_weeks';

import { UNIT } from '../../constants';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Calendar from '../Calendar';
import CalendarWeekPicker from '../CalendarWeekPicker';
import Spacer from '../Spacer';

class CalendarView extends Component {
  static propTypes = {
    trackedShows: PropTypes.arrayOf(ShowProps),
  };

  render() {
    return (
      <div id="calendar">
        <CalendarHeader>
          <CalendarWeekPicker maxDate={addWeeks(new Date(), 2)} />
        </CalendarHeader>

        <Calendar shows={this.props.trackedShows} />

        <Spacer size={UNIT * 6} />
      </div>
    );
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

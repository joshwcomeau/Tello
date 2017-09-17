import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import PropTypes from 'prop-types';
import addWeeks from 'date-fns/add_weeks';

import { UNIT } from '../../constants';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';

import LoggedInLayout from '../LoggedInLayout';
import Calendar from '../Calendar';
import CalendarWeekPicker from '../CalendarWeekPicker';
import Spacer from '../Spacer';


const CalendarView = ({ trackedShows }) => (
  <LoggedInLayout>
    <CalendarHeader>
      <CalendarWeekPicker maxDate={addWeeks(new Date(), 2)} />
    </CalendarHeader>

    <Calendar shows={trackedShows} />

    <Spacer size={UNIT * 6}/>
  </LoggedInLayout>
);

const CalendarHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const mapStateToProps = state => ({
  trackedShows: getTrackedShowsArray(state),
});

export default connect(mapStateToProps)(CalendarView);

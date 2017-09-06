import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { UNITS_IN_PX } from '../../constants';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Calendar from '../Calendar';


class CalendarView extends Component {
  static propTypes = {
    trackedShows: PropTypes.arrayOf(ShowProps),
  }

  render() {
    return (
      <Wrapper>
        <Calendar shows={this.props.trackedShows} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin-top: ${UNITS_IN_PX[3]};
`

const mapStateToProps = state => ({
  trackedShows: getTrackedShowsArray(state),
});

export default connect(mapStateToProps)(CalendarView);

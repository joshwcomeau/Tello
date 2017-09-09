import React from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import {
  getAiredTrackedShowsArrayWithSeasons
} from '../../reducers/tracked-shows.reducer';
import { UNITS_IN_PX, BREAKPOINTS } from '../../constants';
import { ShowProps } from '../../types';
import { sortShows } from '../../helpers/show.helpers';

import SummaryShow from '../SummaryShow';
import SortShows from '../SortShows';


const propTypes = {
  trackedShows: PropTypes.arrayOf(ShowProps),
};

const SummaryView = ({ trackedShows }) => (
  <div id="summary">
    <SortShows />

    <Grid>
      {trackedShows.map(show => (
        <SummaryShow key={show.id} show={show} />
      ))}
    </Grid>
  </div>
);


const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${UNITS_IN_PX[1]};

  @media ${BREAKPOINTS.md} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${BREAKPOINTS.sm} {
    grid-template-columns: 1fr;
  }
`

const mapStateToProps = state => ({
  trackedShows: sortShows({
    shows: getAiredTrackedShowsArrayWithSeasons(state),
    sorting: state.ui.sorting,
  }),
  // NOTE: we need to return `sorting` so that the component re-renders
  // We don't actually need this prop though.
  sorting: state.ui.sorting,
});

SummaryView.propTypes = propTypes;

export default connect(mapStateToProps)(SummaryView);

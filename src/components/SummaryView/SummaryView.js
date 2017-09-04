import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import {
  getAiredTrackedShowsArrayWithSeasons
} from '../../reducers/tracked-shows.reducer';
import { UNITS_IN_PX } from '../../constants';
import { ShowProps } from '../../types';
import { sortShows } from '../../helpers/show.helpers';

import SummaryShow from '../SummaryShow';
import SortShows from '../SortShows';


const SummaryView = ({ trackedShows }) => (
  <div>
    <Header>
      <SortShows />
    </Header>

    <Grid>
      {trackedShows.map(show => (
        <SummaryShow key={show.id} show={show} />
      ))}
    </Grid>
  </div>
);


const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  padding-top: ${UNITS_IN_PX[1]};
  padding-bottom: ${UNITS_IN_PX[1]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${UNITS_IN_PX[1]};
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

export default connect(mapStateToProps)(SummaryView);

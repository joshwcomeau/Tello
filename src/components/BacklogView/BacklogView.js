import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getTrackedShowsWithUnseenEpisodesArray,
} from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';
import { sortShows } from '../../helpers/show.helpers';

import BacklogRow from '../BacklogRow';
import SortShows from '../SortShows';


const propTypes = {
  trackedShows: PropTypes.arrayOf(ShowProps),
}

const BacklogView = ({ trackedShows }) => ([
  <SortShows key="sorter" />,

  trackedShows.map(show => (
    <BacklogRow key={show.id} show={show} />
  ))
]);

BacklogView.propTypes = propTypes;

const mapStateToProps = state => ({
  trackedShows: sortShows({
    shows: getTrackedShowsWithUnseenEpisodesArray(state),
    sorting: state.ui.sorting,
  }),
  // NOTE: we need to return `sorting` so that the component re-renders
  // We don't actually need this prop though.
  sorting: state.ui.sorting,
});

export default connect(mapStateToProps)(BacklogView);

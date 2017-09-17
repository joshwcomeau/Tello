import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { showAddShowModal } from '../../actions';
import { COLORS, UNIT } from '../../constants';
import {
  getTrackedShowsWithUnseenEpisodesArray,
} from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';
import { sortShows } from '../../helpers/show.helpers';

import LoggedInLayout from '../LoggedInLayout';
import BacklogRow from '../BacklogRow';
import NotificationView from '../NotificationView';
import SortShows from '../SortShows';
import Spacer from '../Spacer';


const propTypes = {
  trackedShows: PropTypes.arrayOf(ShowProps),
};

const BacklogView = ({ trackedShows, showAddShowModal }) => {
  let content;
  if (trackedShows.length === 0) {
    content = (
      <NotificationView heading="All episodes seen.">
        You've seen all the episodes in your backlog. Maybe it's time to
        {' '}
        <AddNewShowLink onClick={showAddShowModal}>
          add a new show
        </AddNewShowLink>
        ?
      </NotificationView>
    );
  } else {
    content = trackedShows.map(show => (
      show.episodes
        ? <BacklogRow key={show.id} show={show} />
        : null
    ));
  }

  return (
    <LoggedInLayout>
      <SortShows />

      {content}
    </LoggedInLayout>
  )
};

const AddNewShowLink = styled.a`
  cursor: pointer;
  color: ${COLORS.cyan.dark};
`;

const mapStateToProps = state => ({
  trackedShows: sortShows({
    shows: getTrackedShowsWithUnseenEpisodesArray(state),
    sorting: state.ui.sorting,
  }),
  // NOTE: we need to return `sorting` so that the component re-renders
  // We don't actually need this prop though.
  sorting: state.ui.sorting,
});

BacklogView.propTypes = propTypes;

export default connect(mapStateToProps, { showAddShowModal })(BacklogView);

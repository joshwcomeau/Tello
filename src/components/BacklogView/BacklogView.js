import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { showAddShowModal } from '../../actions';
import { COLORS, UNIT } from '../../constants';
import { getTrackedShowsWithUnseenEpisodesArray } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';
import { sortShows } from '../../helpers/show.helpers';

import BacklogRow from '../BacklogRow';
import NotificationView from '../NotificationView';
import SortShows from '../SortShows';
import Spacer from '../Spacer';

const propTypes = {
  trackedShows: PropTypes.arrayOf(ShowProps),
};

const BacklogView = ({ trackedShows, showAddShowModal }) => {
  if (trackedShows.length === 0) {
    return (
      <NotificationView heading="All episodes seen.">
        You've seen all the episodes in your backlog. Maybe it's time to{' '}
        <AddNewShowLink onClick={showAddShowModal}>
          add a new show
        </AddNewShowLink>
        ?
      </NotificationView>
    );
  }

  return (
    <div id="backlog">
      <SortShows />

      {trackedShows.map(
        show =>
          show.episodes ? <BacklogRow key={show.id} show={show} /> : null
      )}

      <Spacer size={UNIT * 6} />
    </div>
  );
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTrackedShows } from '../../reducers/auth.reducer';

import BacklogRow from '../BacklogRow';


class Backlog extends Component {
  componentDidMount() {
    // TODO: If we aren't logged in, redirect to a login page.
  }

  render() {
    const { trackedShows } = this.props;

    // TODO: Figure out if we're still waiting on results.
    // We should be able to tell by comparing `isLoggedIn` to `userData`,
    // but if not we can always add a redux field to `auth` reducer.

    return (
      <span>
        {trackedShows.map(show => (
          <BacklogRow key={show.id} show={show} />
        ))}
      </span>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  trackedShows: getTrackedShows(state),
});

export default connect(mapStateToProps)(Backlog);

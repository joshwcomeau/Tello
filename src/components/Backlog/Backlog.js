import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getTrackedShows } from '../../reducers/auth.reducer';

import BacklogRow from '../BacklogRow';
import Heading from '../Heading';


class Backlog extends Component {
  componentDidMount() {
    // If the user isn't logged in, redirect them to the login page.
    // NOTE: Tried doing this with ReactRouter's <Redirect>, but it didn't work :/
    // Same with using `withRouter` and .push-ing a new state.
    if (!this.props.isLoggedIn) {
      window.location = '/login';
    }
  }
  render() {
    console.log('Render Backlog')
    const { isLoggedIn, trackedShows } = this.props;

    // TODO: Figure out if we're still waiting on results.
    // We should be able to tell by comparing `isLoggedIn` to `userData`,
    // but if not we can always add a redux field to `auth` reducer.

    return (
      <span>
        <Heading>Backlog</Heading>
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

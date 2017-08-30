import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getIsLoggedIn, getTrackedShowsArray } from '../../reducers/auth.reducer';
import { ShowProps } from '../../types';

import BacklogRow from '../BacklogRow';
import Heading from '../Heading';


class BacklogView extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    trackedShows: PropTypes.arrayOf(ShowProps),
  }

  render() {
    const { trackedShows } = this.props;

    return (
      <span>
        <Heading theme="light">Backlog</Heading>
        {trackedShows.map(show => (
          <BacklogRow key={show.id} show={show} />
        ))}
      </span>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  trackedShows: getTrackedShowsArray(state),
});

export default connect(mapStateToProps)(BacklogView);

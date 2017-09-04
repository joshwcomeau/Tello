import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAiredTrackedShowsArray } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import BacklogRow from '../BacklogRow';
import Heading from '../Heading';


class BacklogView extends Component {
  static propTypes = {
    trackedShows: PropTypes.arrayOf(ShowProps),
  }

  render() {
    const { trackedShows } = this.props;

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
  trackedShows: getAiredTrackedShowsArray(state),
});

export default connect(mapStateToProps)(BacklogView);

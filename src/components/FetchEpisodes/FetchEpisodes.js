import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { episodesRequest } from '../../actions';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';


class FetchEpisodes extends PureComponent {
  componentDidMount() {
    const { shows, episodesRequest } = this.props;

    shows.forEach(show => {
      if (!show.episodes) {
        episodesRequest({ showId: show.id });
      }
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  shows: getTrackedShowsArray(state),
});

export default connect(mapStateToProps, { episodesRequest })(FetchEpisodes);

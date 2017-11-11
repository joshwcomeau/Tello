import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { episodesRequest } from '../../actions';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';

class FetchEpisodes extends PureComponent {
  static showIds = {};

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    this.fetch();
  }

  fetch() {
    const { shows, episodesRequest } = this.props;

    shows.forEach(show => {
      // Don't fetch shows that we've already fetched!
      const requiresFetching = !FetchEpisodes.showIds[show.id];

      if (requiresFetching) {
        FetchEpisodes.showIds[show.id] = true;

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

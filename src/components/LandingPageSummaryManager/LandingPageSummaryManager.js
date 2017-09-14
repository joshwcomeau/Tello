import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ShowProps } from '../../types';
import { toggleInArray } from '../../utils';

import { SummaryShow } from '../SummaryShow';


class LandingPageSummaryManager extends PureComponent {
  static propTypes = {
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func,
    show: ShowProps,
  }

  state = {
    // Transfer ownership from props to state.
    show: this.props.show
  }

  toggleEpisode = ({ episodeId }) => {
    const nextSeenEpisodeIds = toggleInArray(
      this.state.show.seenEpisodeIds,
      episodeId
    );

    this.setState({
      show: {
        ...this.state.show,
        seenEpisodeIds: nextSeenEpisodeIds,
      }
    });
  }

  render() {
    console.log(this.state.show);
    return (
      <span
        onMouseEnter={this.props.handleMouseEnter}
        onMouseLeave={this.props.handleMouseLeave}
      >
        <SummaryShow
          noManage
          toggleEpisode={this.toggleEpisode}
          show={this.state.show}
        />
      </span>
    );
  }
}

export default LandingPageSummaryManager;

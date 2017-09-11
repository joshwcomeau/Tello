import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import FlipMove from 'react-flip-move';

import {
  COLORS,
  UNIT,
  HALF_UNIT,
  HALF_UNIT_PX,
  UNITS_IN_PX,
  ROW_HEIGHT,
  ROW_HEIGHT_PX
} from '../../constants';
import { markEpisodeAsSeen } from '../../actions';
import { ShowProps } from '../../types';

import BacklogEpisode from '../BacklogEpisode';
import Heading from '../Heading';
import Tag from '../Tag';


const TOGGLE_ANIMATION_DURATION = 300;

class BacklogRow extends Component {
  static propTypes = {
    show: ShowProps,
  }

  state = {
    isToggling: false,
  }

  componentWillUnmount() {
    window.clearTimeout(this.markEpisodeAsSeenTimeoutId)
  }

  handleEpisodeClick = (episode) => {
    const { show, markEpisodeAsSeen } = this.props;

    // Episodes take some time to disappear, and bad things happen if the user
    // tries toggling other things in that time.
    if (this.state.isToggling) {
      return;
    }

    this.setState({ isToggling: true }, () => {
      markEpisodeAsSeen({
        showId: show.id,
        showName: show.name,
        episodeId: episode.id,
        episodeName: episode.name,
      });

      // HACK: Due to a bug in FlipMove, we have to wait a couple frames longer
      // than the animation duration, before unsetting the `isToggling` state
      this.markEpisodeAsSeenTimeoutId = window.setTimeout(() => {
        this.setState({ isToggling: false });
      }, TOGGLE_ANIMATION_DURATION + 35)
    });
  }

  renderEpisodes() {
    const {
      show: { type, episodes },
    } = this.props;

    if (!episodes) {
      // TODO: Loading? Also add some sort of isFetching flag to shows,
      // so that we can distinguish "this show has no episodes".
      return null;
    }

    const unseenEpisodes = episodes
      .filter(episode => !episode.isSeen)
      .slice(0, 8);

    return (
      <EpisodeWrapper>
        <EpisodeGradient />
        <FlipMove
          duration={TOGGLE_ANIMATION_DURATION}
          enterAnimation={false}
          leaveAnimation="fade"
        >
          {unseenEpisodes.map(episode => (
            <BacklogEpisode
              key={episode.id}
              showType={type}
              height={ROW_HEIGHT - UNIT}
              episode={episode}
              handleClick={() => this.handleEpisodeClick(episode)}
            />
          ))}
        </FlipMove>
      </EpisodeWrapper>
    );
  }

  render() {
    const { show: { type, name, episodes } } = this.props;

    // We may or may not want to actually display this row.
    // We won't know until the episodes are fetched from TV Maze.
    // For now, just return null.
    if (!episodes) {
      return null;
    }

    return (
      <Wrapper>
        <Row>
          <ShowDetails>
            <Heading size="small">{name}</Heading>
            <TagWrapper>
              <Tag domain={type} />
            </TagWrapper>
          </ShowDetails>

          {this.renderEpisodes()}
        </Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  color: ${COLORS.black};
  background: ${COLORS.white};
  box-shadow: 1px 0px 3px rgba(0,0,0,0.9);
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const Row = styled.div`
  display: flex;
  height: ${ROW_HEIGHT_PX};
`;

const ShowDetails = styled.div`
  display: block;
  position: relative;
  padding: ${HALF_UNIT_PX};
  width: ${UNITS_IN_PX[15]};
  box-shadow: 0px 1px 6px rgba(0,0,0,0.4);
`;

const TagWrapper = styled.div`
  position: absolute;
  left: ${HALF_UNIT_PX};
  bottom: ${HALF_UNIT_PX};
`

const EpisodeWrapper = styled.div`
  position: relative;
  flex: 1;
  padding: ${HALF_UNIT_PX};
  margin-right: ${HALF_UNIT_PX};
  overflow: hidden;
  white-space: nowrap;
  padding-left: ${HALF_UNIT + 2 + 'px'};
`;

const EpisodeGradient = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(255,255,255,0),
    rgba(255,255,255,0.8)
  );
`;

export default connect(null, { markEpisodeAsSeen })(BacklogRow);

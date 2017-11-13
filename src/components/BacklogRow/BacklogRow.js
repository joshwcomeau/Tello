import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import FlipMove from 'react-flip-move';

import {
  BREAKPOINTS,
  COLORS,
  UNIT,
  HALF_UNIT,
  HALF_UNIT_PX,
  UNITS_IN_PX,
  ROW_HEIGHT,
  ROW_HEIGHT_PX,
} from '../../constants';
import { markEpisodeAsSeen } from '../../actions';
import { ShowProps } from '../../types';

import BacklogEpisode from '../BacklogEpisode';
import Heading from '../Heading';
import StopTouchPropagation from '../StopTouchPropagation';
import Tag from '../Tag';

const TOGGLE_ANIMATION_DURATION = 300;

class BacklogRow extends Component {
  static propTypes = {
    demo: PropTypes.bool,
    show: ShowProps,
  };

  state = {
    isToggling: false,
  };

  componentWillUnmount() {
    window.clearTimeout(this.markEpisodeAsSeenTimeoutId);
  }

  handleEpisodeClick = episode => {
    const { demo, show, markEpisodeAsSeen } = this.props;

    // Episodes take some time to disappear, and bad things happen if the user
    // tries toggling other things in that time.
    if (this.state.isToggling) {
      return;
    }

    this.setState({ isToggling: true }, () => {
      markEpisodeAsSeen({
        demo,
        showId: show.id,
        showName: show.name,
        episodeId: episode.id,
        episodeName: episode.name,
      });

      // HACK: Due to a bug in FlipMove, we have to wait a couple frames longer
      // than the animation duration, before unsetting the `isToggling` state
      this.markEpisodeAsSeenTimeoutId = window.setTimeout(() => {
        this.setState({ isToggling: false });
      }, TOGGLE_ANIMATION_DURATION + 35);
    });
  };

  renderEpisodes() {
    const { show: { type, episodes } } = this.props;

    const unseenEpisodes = episodes
      .filter(episode => !episode.isSeen)
      .slice(0, 8);

    return (
      <EpisodeWrapper>
        <StopTouchPropagation>
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
        </StopTouchPropagation>
      </EpisodeWrapper>
    );
  }

  render() {
    const { show: { type, name } } = this.props;

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
  box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.9);
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const Row = styled.div`
  display: flex;
  height: ${ROW_HEIGHT_PX};

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
    height: auto;
  }
`;

const ShowDetails = styled.div`
  display: block;
  position: relative;
  z-index: 2;
  padding: ${HALF_UNIT_PX};
  width: ${UNITS_IN_PX[15]};
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.4);

  @media ${BREAKPOINTS.sm} {
    width: 100%;
  }
`;

const TagWrapper = styled.div`
  position: absolute;
  left: ${HALF_UNIT_PX};
  bottom: ${HALF_UNIT_PX};

  @media ${BREAKPOINTS.sm} {
    position: relative;
    left: auto;
    bottom: auto;
  }
`;

const EpisodeWrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  padding: ${HALF_UNIT_PX};
  margin-right: ${HALF_UNIT_PX};
  overflow: hidden;
  white-space: nowrap;
  padding-left: ${HALF_UNIT + 2 + 'px'};

  @media ${BREAKPOINTS.sm} {
    overflow: auto;
    padding-left: ${HALF_UNIT_PX};
  }
`;

export default connect(null, { markEpisodeAsSeen })(BacklogRow);

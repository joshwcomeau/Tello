import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, UNIT, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { episodesRequest, toggleEpisode } from '../../actions';
import { truncateStringByWordCount } from '../../utils';
import placeholderImage from '../../images/placeholder.png';
import { ShowProps } from '../../types';

import Clearfix from '../Clearfix';
import Heading from '../Heading';
import Scrollable from '../Scrollable';
import ShowStatus from '../ShowStatus';
import Tag from '../Tag';


class SummaryShow extends Component {
  static propTypes = {
    show: ShowProps,
  }

  componentDidMount() {
    const { show, episodesRequest } = this.props;
    // If we don't yet have any `episodes` for this show, we have to fetch
    // them! We can make a few assumptions though:
    // - The list of episodes won't change externally in a given session,
    //   so if we already have them, we don't need to fetch them.
    // - We only have to do this check on mount, because a given BacklogRow
    //   will never change shows after mount.
    if (!show.episodes) {
      episodesRequest({ showId: show.id });
    }
  }

  handleEpisodeClick = (episode) => {
    const { show, toggleEpisode } = this.props;

    toggleEpisode({
      showId: show.id,
      showName: show.name,
      episodeId: episode.id,
      episodeName: episode.name,
    });
  }

  renderEpisodeGrid() {
    const { seasons, episodes } = this.props.show;

    if (!episodes) {
      // TODO: loading
      return null;
    }

    const episodesBySeason = Object.keys(seasons).map(id => seasons[id]);

    return (
      <EpisodeGrid>
        <Scrollable>
          <EpisodeGridContents>
            {episodesBySeason.map((season, index) => (
              <Season key={index}>
                <SeasonTitle>Season {index + 1}</SeasonTitle>
                {season.map(episode => (
                  <Episode
                    key={episode.id}
                    isSeen={episode.isSeen}
                    onMouseEnter={this.hoverEpisode}
                    onMouseLeave={this.leaveEpisode}
                  />
                ))}
              </Season>
            ))}

          </EpisodeGridContents>
        </Scrollable>
        <EpisodeOverflowGradient />
      </EpisodeGrid>
    );
  }

  render() {
    const {
      show: { id, name, image, type, status, summary },
    } = this.props;

    return (
      <Wrapper>
        <ImageHeader image={image || placeholderImage}>
          <TagWrapper>
            <Tag domain={type} />
          </TagWrapper>
        </ImageHeader>

        <Body>
          <Scrollable>
            <ShowName>{name}</ShowName>
            <ShowStatus status={status} />

            <Summary>
              {truncateStringByWordCount(summary, 20)}
            </Summary>
          </Scrollable>
        </Body>

        {this.renderEpisodeGrid()}
      </Wrapper>
    );
  }
}

const setBackgroundImage = ({ image }) => `url(${image})`;

const EPISODE_DOT_SIZE = 13;
const EPISODE_MARGIN = 1;
const EPISODE_DOT_SIZE_PX = `${EPISODE_DOT_SIZE}px`;
const EPISODE_ROW_HEIGHT = EPISODE_DOT_SIZE + EPISODE_MARGIN * 2;
const MAX_EPISODE_ROWS = 10;

const Wrapper = styled.div`
  background: ${COLORS.white};
`;

const ImageHeader = styled.header`
  position: relative;
  height: ${UNITS_IN_PX[6]};
  background-image: ${setBackgroundImage};
  background-size: cover;
  background-position: center center;
`;

const TagWrapper = styled.div`
  position: absolute;
  right: ${UNITS_IN_PX[1]};
  top: ${UNITS_IN_PX[1]};
`;

const ShowName = styled.h3`
  font-size: 28px;
  letter-spacing: -1px;
  line-height: 28px;
`;

const Body = styled.div`
  position: relative;
  z-index: 2;
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
  height: 166px;
  overflow: auto;
  box-shadow: 0px 1px 6px rgba(0,0,0,0.4);
`;

const Summary = styled.div`
  margin-top: ${HALF_UNIT_PX};
  font-size: 14px;
`

const EpisodeGrid = styled.div`
  position: relative;
  z-index: 1;
  height: ${UNIT * 2 + MAX_EPISODE_ROWS * EPISODE_ROW_HEIGHT + 'px'};
`;

const EpisodeGridContents = styled.div`
  padding: ${UNITS_IN_PX[1]};
`;

const Season = styled(Clearfix)`
  margin-bottom: ${UNITS_IN_PX[1]}
`;

const SeasonTitle = styled.h5`
  font-size: 14px;
  font-weight: bold;
  color: ${COLORS.gray.primary};
`

const EpisodeOverflowGradient = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${UNITS_IN_PX[1]};
  background: linear-gradient(
    to top,
    rgba(255,255,255,1),
    rgba(255,255,255,0)
  );
`

const Episode = styled.div`
  display: block;
  float: left;
  width: ${EPISODE_DOT_SIZE_PX};
  height: ${EPISODE_DOT_SIZE_PX};
  background-color: ${props => props.isSeen
    ? COLORS.green.primary
    : '#E4E4E4'
  };
  margin: 1px;
  transition: 250ms;

  &:hover {
    transform: scale(${1 + 1/(EPISODE_DOT_SIZE / 2)});

    background-color: ${props => props.isSeen
      ? COLORS.green.dark
      : COLORS.gray.light
    };
  }
`

const mapDispatchToProps = { episodesRequest, toggleEpisode };

export default connect(null, mapDispatchToProps)(SummaryShow);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import {
  COLORS,
  UNIT,
  HALF_UNIT,
  HALF_UNIT_PX,
  UNITS_IN_PX,
  ROW_HEIGHT,
  ROW_HEIGHT_PX
} from '../../constants';
import { episodesRequest, toggleEpisode } from '../../actions';

import BacklogEpisode from '../BacklogEpisode';
import Heading from '../Heading';
import Tag from '../Tag';


const propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    episodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      season: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      airdate: PropTypes.string.isRequired,
    })),
  }),
};

class BacklogRow extends Component {
  static propTypes = propTypes

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

  renderEpisodes() {
    const { show: { id, type, episodes } } = this.props;

    if (!episodes) {
      // TODO: Loading? Also add some sort of isFetching flag to shows,
      // so that we can distinguish "this show has no episodes".
      return null;
    }

    return (
      <EpisodeWrapper>
        <EpisodeGradient />
        {episodes.slice(0, 4).map(episode => (
          <BacklogEpisode
            key={episode.id}
            showType={type}
            height={ROW_HEIGHT - UNIT}
            season={episode.season}
            number={episode.number}
            name={episode.name}
            airDate={episode.airdate}
            handleClick={() => toggleEpisode({
              showId: id,
              episodeId: episode.id,
            })}
          />
        ))}
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

const mapDispatchToProps = { episodesRequest, toggleEpisode };

export default connect(null, mapDispatchToProps)(BacklogRow);

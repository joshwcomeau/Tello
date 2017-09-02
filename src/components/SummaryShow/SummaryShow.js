import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { episodesRequest, toggleEpisode } from '../../actions';
import { truncateStringByWordCount } from '../../utils';
import placeholderImage from '../../images/placeholder.png';
import { ShowProps } from '../../types';

import EpisodeGrid from '../EpisodeGrid';
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

  render() {
    const {
      show: { id, name, image, type, seasons, status, summary },
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

        <EpisodeGrid seasons={seasons} />
      </Wrapper>
    );
  }
}

const setBackgroundImage = ({ image }) => `url(${image})`;

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

const mapDispatchToProps = { episodesRequest, toggleEpisode };

export default connect(null, mapDispatchToProps)(SummaryShow);

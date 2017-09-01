import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { episodesRequest, toggleEpisode } from '../../actions';
import { truncateStringByWordCount } from '../../utils';
import placeholderImage from '../../images/placeholder.png';
import { ShowProps } from '../../types';

import Heading from '../Heading';
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
      show: { id, name, image, type, summary, episodes },
    } = this.props;

    // TODO: Some sort of loading indicator for episodes?

    console.log(episodes)

    return (
      <Wrapper>
        <ImageHeader image={image || placeholderImage}>
          <TagWrapper>
            <Tag domain={type} />
          </TagWrapper>
        </ImageHeader>

        <Body>
          <ShowName>{name}</ShowName>

          {truncateStringByWordCount(summary, 20)}
        </Body>

        <EpisodeGrid>

        </EpisodeGrid>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: ${COLORS.white};
`;

const setBackgroundImage = ({ image }) => `url(${image})`;

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
  margin-bottom: ${HALF_UNIT_PX};
`;

const Body = styled.div`
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
  height: 166px;
  overflow: auto;
  box-shadow: 0px 1px 6px rgba(0,0,0,0.4);
`;

const EpisodeGrid = styled.div`
  padding: ${UNITS_IN_PX[1]};
`;

const mapDispatchToProps = { episodesRequest, toggleEpisode };

export default connect(null, mapDispatchToProps)(SummaryShow);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import {
  episodesRequest,
  toggleEpisode,
  showEditShowModal
} from '../../actions';
import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { truncateStringByWordCount } from '../../utils';
import placeholderImage from '../../images/placeholder.png';
import { ShowProps } from '../../types';

import Button from '../Button';
import EpisodeGrid from '../EpisodeGrid';
import ShowStatus from '../ShowStatus';


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

  handleClickEpisode = (episode) => {
    const { show, toggleEpisode } = this.props;

    toggleEpisode({
      showId: show.id,
      showName: show.name,
      episodeId: episode.id,
      episodeName: episode.name,
    });
  }

  handleClickEditButton = () => {
    this.props.showEditShowModal({ showId: this.props.show.id });
  }

  render() {
    const {
      show: { name, image, seasons, status, summary },
    } = this.props;

    return (
      <Wrapper>
        <ImageHeader image={image || placeholderImage}>
          <Actions data-selector="actions">
            <Button
              size="small"
              color="gray"
              onClick={this.handleClickEditButton}
            >
              Manage Show
            </Button>
          </Actions>
        </ImageHeader>

        <Body>
          <ShowName>{name}</ShowName>
          <ShowStatus status={status} />

          <Summary>
            {truncateStringByWordCount(summary, 20)}
          </Summary>
        </Body>

        <EpisodeGrid
          handleClickEpisode={this.handleClickEpisode}
          seasons={seasons}
        />
      </Wrapper>
    );
  }
}

const setBackgroundImage = ({ image }) => `url(${image})`;

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.white};

  &:hover [data-selector="actions"] {
    opacity: 1;
  }
`;

const ImageHeader = styled.header`
  position: relative;
  height: ${UNITS_IN_PX[6]};
  background-image: ${setBackgroundImage};
  background-size: cover;
  background-position: center center;
`;

const ShowName = styled.h3`
  font-size: 28px;
  letter-spacing: -1px;
  line-height: 28px;
  margin-bottom: 4px;
`;

const Body = styled.div`
  position: relative;
  z-index: 2;
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
`;

const Summary = styled.div`
  margin-top: ${HALF_UNIT_PX};
  font-size: 14px;
`;

const Actions = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  opacity: 0;
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
  transition: opacity 600ms;
`;

const mapDispatchToProps = {
  episodesRequest,
  toggleEpisode,
  showEditShowModal,
};

export default connect(null, mapDispatchToProps)(SummaryShow);

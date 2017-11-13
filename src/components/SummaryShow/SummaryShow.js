import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import LazyLoad from 'react-lazyload';

import { toggleEpisode, showEditShowModal } from '../../actions';
import {
  BREAKPOINTS,
  COLORS,
  HALF_UNIT_PX,
  UNITS_IN_PX,
} from '../../constants';
import { isDesktop } from '../../helpers/responsive.helpers';
import {
  getHumanizedEpisodeAirDate,
  getEpisodeNumString,
} from '../../helpers/show.helpers';
import { truncateStringByWordCount } from '../../utils';
import { ShowProps } from '../../types';

import Button from '../Button';
import EpisodeGrid from '../EpisodeGrid';
import ShowStatus from '../ShowStatus';
import Spinner from '../Spinner';

import { buildImageUrl } from './SummaryShow.helpers';

const HIGHLIGHT_FADE_DURATION = 500;

export class SummaryShow extends PureComponent {
  state = {
    episode: null,
    isHighlightingEpisode: false,
  };

  static propTypes = {
    show: ShowProps.isRequired,
    demo: PropTypes.bool,
    toggleEpisode: PropTypes.func.isRequired,
    showEditShowModal: PropTypes.func,
  };

  handleHoverEpisode = episode => {
    this.setState({ episode, isHighlightingEpisode: true });
  };

  handleLeaveSummary = () => {
    this.setState({ isHighlightingEpisode: false });
  };

  handleClickEpisode = episode => {
    const { show, toggleEpisode, demo } = this.props;

    toggleEpisode({
      demo,
      showId: show.id,
      showName: show.name,
      episodeId: episode.id,
      episodeName: episode.name,
    });
  };

  handleClickEditButton = () => {
    this.props.showEditShowModal({ showId: this.props.show.id });
  };

  renderSummaryArea() {
    const { isHighlightingEpisode, episode } = this.state;

    return isHighlightingEpisode ? (
      <HighlightedEpisode isVisible={isHighlightingEpisode}>
        <EpisodeName>{episode.name}</EpisodeName>
        <EpisodeDetails>
          {getEpisodeNumString(episode)}
          &nbsp;-&nbsp;
          {getHumanizedEpisodeAirDate(episode)}
        </EpisodeDetails>
      </HighlightedEpisode>
    ) : (
      <Summary>
        {truncateStringByWordCount(this.props.show.summary, 20)}
      </Summary>
    );
  }

  render() {
    const { demo, show } = this.props;

    if (!show) {
      return null;
    }

    const { isLoading, name, image, seasons, status } = show;

    // We want to show a "manage" button on hover, unless we've explicitly
    // disabled it (which we do for demo units), or unles we're on mobile
    // (TODO: Mobile solution).
    const showActions = !demo && isDesktop();

    return (
      <Wrapper onMouseLeave={this.handleLeaveSummary} isLoading={isLoading}>
        {isLoading && (
          <SpinnerFullContainer>
            <Spinner />
          </SpinnerFullContainer>
        )}

        <ImageHeader>
          <LazyLoad once height={UNITS_IN_PX[6]} offset={50}>
            <Image
              srcSet={`
                ${buildImageUrl({
                  image,
                  width: 495,
                  height: 128,
                })},
                ${buildImageUrl({
                  image,
                  width: 334,
                  height: 96,
                })}
              `}
              sizes={`
                ${BREAKPOINTS.smMin} 334px,
                495px
              `}
            />
          </LazyLoad>
          {showActions && (
            <Actions data-selector="actions">
              <Button
                size="small"
                color="dark"
                onClick={this.handleClickEditButton}
              >
                Manage Show
              </Button>
            </Actions>
          )}
        </ImageHeader>

        <Body>
          <ShowName>{name}</ShowName>
          <ShowStatus status={status} />

          <SummaryArea>{this.renderSummaryArea()}</SummaryArea>
        </Body>

        <EpisodeGrid
          handleHoverEpisode={this.handleHoverEpisode}
          handleClickEpisode={this.handleClickEpisode}
          seasons={seasons}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.white};
  /*
    This property is needed to avoid having wrappers with long, no-wrap text
    affect the layout of the grid. -shrugs-
  */
  min-width: 0;

  &:hover [data-selector='actions'] {
    opacity: 1;
  }
`;

const SpinnerFullContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
`;

const ImageHeader = styled.header`
  position: relative;
  top: 2px;
  left: 2px;
  right: 2px;
  width: calc(100% - 4px);
`;

const Image = styled.img`
  width: 100%;
  position: relative;
  z-index: 1;
  object-fit: cover;
  height: ${UNITS_IN_PX[6]};

  @media ${BREAKPOINTS.sm} {
    height: ${UNITS_IN_PX[8]};
  }
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

const SummaryArea = styled.div`
  height: 60px;
  overflow: hidden;
`;

const Summary = styled.div`
  margin-top: ${HALF_UNIT_PX};
  font-size: 14px;
`;

const Actions = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  opacity: 0;
  padding: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.veryDark};
  transition: opacity 600ms;
`;

const HighlightedEpisode = styled.div`
  padding: ${UNITS_IN_PX[1]} 0;
  color: ${COLORS.gray.veryDark};
  text-align: center;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity ${HIGHLIGHT_FADE_DURATION + 'ms'};
`;

const EpisodeName = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EpisodeDetails = styled.div`
  font-size: 13px;
  color: ${COLORS.gray.primary};
`;

const mapDispatchToProps = {
  toggleEpisode,
  showEditShowModal,
};

export default connect(null, mapDispatchToProps)(SummaryShow);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { keyframes } from 'emotion'
import styled from 'emotion/react';

import { toggleEpisode } from '../../actions';
import { COLORS, EPISODE_COLOR, HALF_UNIT_PX } from '../../constants';
import { getEpisodeNumString } from '../../helpers/show.helpers';
import { ShowProps, EpisodeProps } from '../../types';

import Cell from '../Cell';


class CalendarEpisode extends PureComponent {
  static propTypes = {
    demo: PropTypes.bool,
    show: ShowProps.isRequired,
    episode: EpisodeProps.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    margin: PropTypes.number,
    height: PropTypes.number,
    toggleEpisode: PropTypes.func.isRequired,
  }

  handleClick = () => {
    const { demo, show, episode, toggleEpisode } = this.props;

    toggleEpisode({
      demo,
      showId: show.id,
      showName: show.name,
      episodeId: episode.id,
      episodeName: episode.name,
    });
  }

  render() {
    const { show, episode, row, col, margin, height } = this.props;

    const isSeen = show.seenEpisodeIds.includes(episode.id);

    return (
      <EpisodeCell
        row={row}
        col={col}
        margin={margin}
        height={height}
        isSeen={isSeen}
        onClick={this.handleClick}
      >
        <Name>{episode.name}</Name>
        <NumString>{getEpisodeNumString(episode)}</NumString>
      </EpisodeCell>
    );
  }
}


const slide = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const getBackground = ({ isSeen }) => (
  isSeen
    ? COLORS.gray.dark
    : `linear-gradient(
      ${EPISODE_COLOR.base},
      ${EPISODE_COLOR.highlight}
    )`
);

const EpisodeCell = styled(Cell)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${HALF_UNIT_PX};
  height: ${props => props.height - 5 + 'px'};
  margin-top: 2px;
  margin-left: 2px;
  margin-right: 3px;
  color: ${COLORS.white};
  background: ${getBackground};
  animation: ${slide} 600ms ease-out;
  cursor: default;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: bold;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NumString = styled.div`
  font-size: 11px;
  opacity: 0.75;
`;


export default connect(null, { toggleEpisode })(CalendarEpisode);

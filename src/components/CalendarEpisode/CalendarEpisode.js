import React from 'react';
import { keyframes } from 'emotion'
import styled from 'emotion/react';

import { COLORS, EPISODE_COLOR, HALF_UNIT_PX } from '../../constants';
import { getEpisodeNumString } from '../../helpers/show.helpers';

import Cell from '../Cell';


const CalendarEpisode = ({ episode, row, col, margin, height }) => (
  <EpisodeCell
    row={row}
    col={col}
    margin={margin}
    height={height}
  >
    <Name>{episode.name}</Name>
    <NumString>{getEpisodeNumString(episode)}</NumString>
  </EpisodeCell>
);


const slide = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

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
  background: linear-gradient(
    ${EPISODE_COLOR.base},
    ${EPISODE_COLOR.highlight}
  );
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

export default CalendarEpisode;

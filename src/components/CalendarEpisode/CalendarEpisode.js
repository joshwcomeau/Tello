import React from 'react';
import { keyframes } from 'emotion'
import styled from 'emotion/react';

import { COLORS, UNIT, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { getEpisodeNumString } from '../../helpers/show.helpers';

import Cell from '../Cell';


const CalendarEpisode = ({ episode, row, col, color1, color2, margin, height }) => (
  <EpisodeCell
    row={row}
    col={col}
    color1={color1}
    color2={color2}
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
    ${props => props.color1},
    ${props => props.color2}
  );
  animation: ${slide} 600ms ease-out;
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

import React from 'react';
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


const EpisodeCell = styled(Cell)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${HALF_UNIT_PX};
  height: ${props => props.height - 3 + 'px'};
  margin-top: 1px;
  margin-left: 1px;
  margin-right: 2px;
  color: ${COLORS.white};
  background: linear-gradient(
    ${props => props.color1},
    ${props => props.color2}
  );
  border: 1px solid ${COLORS.gray.veryDark};
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NumString = styled.div`
  font-size: 12px;
  opacity: 0.75;
`;

export default CalendarEpisode;

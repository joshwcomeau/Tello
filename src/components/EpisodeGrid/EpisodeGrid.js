import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';
import { isEmpty } from '../../utils';

import Clearfix from '../Clearfix';
import Scrollable from '../Scrollable';


const EPISODE_DOT_SIZE = 10;
const EPISODE_MARGIN = 1;
const EPISODE_DOT_SIZE_PX = `${EPISODE_DOT_SIZE}px`;
const EPISODE_ROW_HEIGHT = EPISODE_DOT_SIZE + EPISODE_MARGIN * 2;
const MAX_EPISODE_ROWS = 10;
const GRID_MAX_HEIGHT = UNIT * 2 + MAX_EPISODE_ROWS * EPISODE_ROW_HEIGHT;
const GRID_MAX_HEIGHT_PX = GRID_MAX_HEIGHT + 'px';

const EpisodeGrid = ({ seasons }) => {
  if (!seasons || isEmpty(seasons)) {
    // TODO: loading
    return null;
  }

  const episodesBySeason = Object.keys(seasons).map(id => seasons[id]);

  return (
    <Wrapper>
      <Scrollable maxHeight={GRID_MAX_HEIGHT_PX}>
        <EpisodeGridContents>
          {episodesBySeason.map((season, index) => (
            <Season key={index}>
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
    </Wrapper>
  );
};


const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  max-height: ${GRID_MAX_HEIGHT_PX};
`;

const EpisodeGridContents = styled.div`
  padding: ${UNITS_IN_PX[1]};
`;

const Season = styled(Clearfix)`
  margin-bottom: ${EPISODE_DOT_SIZE + 'px'};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SeasonTitle = styled.h5`
  font-size: 12px;
  font-weight: bold;
  color: ${COLORS.gray.primary};
`;

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
`;

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
`;

export default EpisodeGrid;

import React from 'react';
import styled from 'react-emotion';

import { UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';

import Clearfix from '../Clearfix';
import EpisodeDot from '../EpisodeDot';
import Button from '../Button';

const EditShowSeason = ({ episodes, seasonNum, handleToggleAll }) => {
  const hasSeenEveryEpisode = episodes.every(episode => episode.isSeen);

  return (
    <Wrapper>
      <Info>
        <SeasonTitle>Season {seasonNum}</SeasonTitle>
        <span>
          {episodes.map(episode => (
            <EpisodeDot key={episode.id} size={6} isSeen={episode.isSeen} />
          ))}
        </span>
      </Info>

      <Actions>
        <Button
          size="small"
          onClick={handleToggleAll}
          disabled={hasSeenEveryEpisode}
        >
          {hasSeenEveryEpisode ? 'Season Completed' : 'Mark all as seen'}
        </Button>
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled(Clearfix)`
  display: flex;
  justify-content: space-between;
  padding-right: ${HALF_UNIT_PX};
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Actions = styled.div`
  margin-left: ${UNITS_IN_PX[2]};
`;

const SeasonTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export default EditShowSeason;

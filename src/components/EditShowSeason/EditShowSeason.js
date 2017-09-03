import React from 'react';
import styled from 'emotion/react';

import { UNITS_IN_PX } from '../../constants';

import Clearfix from '../Clearfix';
import EpisodeDot from '../EpisodeDot';
import Button from '../Button';


const EditShowSeason = ({ episodes, seasonNum, handleToggleAll }) => {
  return (
      <Wrapper>
        <Info>
          <SeasonTitle>Season {seasonNum}</SeasonTitle>
          <span>
            {episodes.map(episode => (
              <EpisodeDot
                key={episode.id}
                size={6}
                isSeen={episode.isSeen}
              />
            ))}
          </span>
        </Info>
        <Button size="small" onClick={handleToggleAll}>
          Mark all as seen
        </Button>
      </Wrapper>


  );
};

const Wrapper = styled(Clearfix)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const SeasonTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export default EditShowSeason;

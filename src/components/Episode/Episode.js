import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import getDomainColor from '../../helpers/domain-colors';

import { formatDate, getEpisodeNumString } from './Episode.utils';


const propTypes = {
  height: PropTypes.number.isRequired,
  showType: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  airDate: PropTypes.string.isRequired,
};

const Episode = ({ height, showType, season, number, name, airDate }) => {
  const {baseColor, highlightColor} = getDomainColor(showType);

  return (
    <EpisodeElem height={height} color1={baseColor} color2={highlightColor}>
      <EpisodeHeader>
        <EpisodeAirDate>
          {formatDate(airDate)}
        </EpisodeAirDate>

        <EpisodeNum>
          {getEpisodeNumString(season, number)}
        </EpisodeNum>
      </EpisodeHeader>

      <EpisodeName>{name}</EpisodeName>
    </EpisodeElem>
  );
};

const EpisodeElem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => props.height + 'px'};
  min-width: ${UNITS_IN_PX[10]};
  max-width: ${UNITS_IN_PX[22]};
  margin-right: ${HALF_UNIT_PX};
  padding: ${HALF_UNIT_PX};
  background: linear-gradient(
    ${props => props.color1},
    ${props => props.color2}
  );
  color: ${COLORS.white};
`;

const EpisodeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  opacity: 0.7;
`;

const EpisodeNum = styled.div`
  font-size: 11px;
  text-transform: uppercase;
`;

const EpisodeAirDate = styled.h5`
  font-size: 11px;
  font-weight: normal;
`;

const EpisodeName = styled.h3`
  font-size: 16px;
  line-height: 25px;
  margin-bottom: -3px;
`;

Episode.propTypes = propTypes;

export default Episode;

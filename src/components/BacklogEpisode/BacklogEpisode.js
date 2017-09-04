import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import getDomainColor from '../../helpers/domain-colors.helpers';

import { formatDate, getEpisodeNumString } from './BacklogEpisode.helpers';


// NOTE: Needs to be a class component because it's passed to FlipMove.
// FlipMove doesn't support SFCs.
class BacklogEpisode extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    showType: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    airstamp: PropTypes.string.isRequired,
  }

  render() {
    const {
      height,
      showType,
      season,
      number,
      name,
      airstamp,
      handleClick,
    } = this.props;

    const {baseColor, highlightColor} = getDomainColor(showType);

    return (
      <Episode
        height={height}
        color1={baseColor}
        color2={highlightColor}
        onClick={handleClick}
      >
        <EpisodeHeader>
          <EpisodeAirDate>
            {formatDate(airstamp)}
          </EpisodeAirDate>

          <EpisodeNum>
            {getEpisodeNumString(season, number)}
          </EpisodeNum>
        </EpisodeHeader>

        <EpisodeName>{name}</EpisodeName>
      </Episode>
    );
  }
}

const Episode = styled.div`
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
  cursor: pointer;
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
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
`;

export default BacklogEpisode;

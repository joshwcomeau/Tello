import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import format from 'date-fns/format';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';

const EpisodeElem = styled.div`
  display: inline-block;
  height: ${props => props.height + 'px'};
  margin-right: ${HALF_UNIT_PX};
  padding: ${HALF_UNIT_PX};
  background: linear-gradient(${COLORS.blue.primary}, ${COLORS.deepPurple.primary});
  color: ${COLORS.white};
  border-radius: 4px;
`;

const EpisodeHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const EpisodeNum = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  opacity: 0.6;
`;

const EpisodeName = styled.h3`
  font-size: 15px;
  line-height: 25px;
`;

const EpisodeAirDate = styled.h5`
  font-size: 11px;
  font-weight: normal;
`;

const getEpisodeNumString = (season, episode) => (
  `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`
);

const formatDate = date => format(console.log(date) || date, 'MMM Do, YYYY');

const Episode = ({ height, season, number, name, airDate }) => (
  <EpisodeElem height={height}>
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

export default Episode;

import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';

const EpisodeElem = styled.span`
  display: inline-block;
  height: ${props => props.height + 'px'};
  margin-right: ${HALF_UNIT_PX};
  padding: ${HALF_UNIT_PX};
  background: ${COLORS.purple.primary};
  color: ${COLORS.white};
  border-radius: 4px;
`;

const EpisodeNum = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  color: ${COLORS.gray.light};
`;

const EpisodeName = styled.h3`
  font-size: 15px;
  color: ${COLORS.white};
`;

const getEpisodeNumString = (season, episode) => (
  `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`
);

const Episode = ({ height, season, number, name }) => (
  <EpisodeElem height={height}>
    <EpisodeNum>
      {getEpisodeNumString(season, number)}
    </EpisodeNum>
    <EpisodeName>{name}</EpisodeName>
  </EpisodeElem>
);

export default Episode;

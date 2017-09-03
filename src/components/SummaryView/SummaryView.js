import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { getTrackedShowsArrayWithSeasons } from '../../reducers/tracked-shows.reducer';
import { UNITS_IN_PX } from '../../constants';
import { ShowProps } from '../../types';

import SummaryShow from '../SummaryShow';


const SummaryView = ({ trackedShows }) => (
  <Wrapper>
    {trackedShows.map(show => (
      <SummaryShow key={show.id} show={show} />
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${UNITS_IN_PX[1]};
`;

const mapStateToProps = state => ({
  trackedShows: getTrackedShowsArrayWithSeasons(state),
});

export default connect(mapStateToProps)(SummaryView);

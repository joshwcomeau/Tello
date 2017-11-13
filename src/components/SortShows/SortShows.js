import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { changeSorting } from '../../actions';
import { UNITS_IN_PX, SORT_OPTIONS } from '../../constants';

import Select from '../Select';

const SortShows = ({ selectedOption, changeSorting }) => (
  <Header>
    <Select
      label="Sort"
      options={{
        [SORT_OPTIONS.alpha]: 'Alphabetical',
        [SORT_OPTIONS.dateAdded]: 'Date Added',
        [SORT_OPTIONS.episodeAirDate]: 'Episode Air Date',
      }}
      selectedOption={selectedOption}
      handleChange={value => changeSorting({ sorting: value })}
    />
  </Header>
);

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  height: ${UNITS_IN_PX[4]};
  padding-top: ${UNITS_IN_PX[1]};
  padding-bottom: ${UNITS_IN_PX[1]};
`;

const mapStateToProps = state => ({
  selectedOption: state.ui.sorting,
});

export default connect(mapStateToProps, { changeSorting })(SortShows);

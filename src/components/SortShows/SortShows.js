import React from 'react';
import { connect } from 'react-redux';

import { changeSorting } from '../../actions';
import { SORT_OPTIONS } from '../../constants';

import Select from '../Select';


const SortShows = ({ selectedOption, changeSorting }) => (
  <Select
    label="Sort"
    options={{
      [SORT_OPTIONS.alpha]: 'Alphabetical',
      [SORT_OPTIONS.chrono]: 'Chronological',
    }}
    selectedOption={selectedOption}
    handleChange={value => changeSorting({ sorting: value })}
  />
);

const mapStateToProps = state => ({
  selectedOption: state.ui.sorting,
});

export default connect(mapStateToProps, { changeSorting })(SortShows);

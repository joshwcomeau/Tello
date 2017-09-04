import React from 'react';
import { connect } from 'react-redux';

import { changeSorting } from '../../actions';

import Select from '../Select';


const SortShows = ({ selectedOption, changeSorting }) => (
  <Select
    label="Sort"
    options={{
      alpha: 'Alphabetical',
      newest: 'Newest Episode',
    }}
    selectedOption={selectedOption}
    handleChange={value => changeSorting({ sorting: value })}
  />
);

const mapStateToProps = state => ({
  selectedOption: state.ui.sorting,
});

export default connect(mapStateToProps, { changeSorting })(SortShows);

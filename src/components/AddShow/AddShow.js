import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { addShows } from '../../actions';
import { getTrackedShowIds } from '../../reducers/auth.reducer';
import { getSearchEndpoint, formatSearchResults } from '../../helpers/tv-maze';

import Button from '../Button';
import Heading from '../Heading';
import TextInput from '../TextInput';
import ShowSearchResult from '../ShowSearchResult';
import ShowSearchResults from '../ShowSearchResults';

import { getButtonText } from './AddShow.helpers';


class AddShow extends Component {
  static propTypes = {
    trackedShowIds: PropTypes.arrayOf(PropTypes.string),
    addShows: PropTypes.func.isRequired,
  }

  state = {
    status: 'idle',
    shows: [],
    selectedShowIds: [],
  }

  handleSearch = (query) => {
    this.setState({
      status: 'loading',
      shows: [],
      selectedShowIds: [],
    });

    // NOTE: The "right" way to do this would be to use redux, and proxy through
    // the API. This seems faster and simpler, though. May need to be refactored
    // if the complexity increases.
    const tvMazeEndpoint = getSearchEndpoint(query);

    fetch(tvMazeEndpoint)
      .then(res => res.json())
      .then(formatSearchResults)
      .then(shows => {
        this.setState({
          status: 'done',
          shows: shows,
        });
      })
      .catch(console.error);
  }

  handleToggleShow = (id) => {
    const { selectedShowIds } = this.state;

    let nextShowIds;

    if (selectedShowIds.includes(id)) {
      nextShowIds = selectedShowIds.filter(selectedId => selectedId !== id)
    } else {
      nextShowIds = [...selectedShowIds, id];
    }

    this.setState({ selectedShowIds: nextShowIds });
  }

  handleFinishButton = () => {
    const { selectedShowIds, shows } = this.state;

    const selectedShows = selectedShowIds.map(id => (
      shows.find(show => show.id === id)
    ));

    this.props.addShows({ shows: selectedShows });
  }

  render() {
    console.log('Show Ids', this.props.trackedShowIds);
    const numOfShowsSelected = this.state.selectedShowIds.length

    return (
      <Wrapper>
        <Heading>Add New Show</Heading>

        <TextInput
          placeholder="eg. Game of Thrones"
          onChange={this.handleSearch}
          changeDebounceTime={300}
        />

        <Flex>
          <ShowSearchResults
            status={this.state.status}
            shows={this.state.shows}
            onToggleShow={this.handleToggleShow}
            style={{ flex: 1 }}
          />
        </Flex>

        <Button
          fill
          disabled={numOfShowsSelected === 0}
          onClick={this.handleFinishButton}
        >
          {getButtonText(numOfShowsSelected)}
        </Button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Flex = styled.div`
  flex: 1;
`;

const mapStateToProps = state => ({
  trackedShowIds: getTrackedShowIds(state),
});

export default connect(mapStateToProps, { addShows })(AddShow);

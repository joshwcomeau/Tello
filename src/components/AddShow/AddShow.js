import React, { Component } from 'react';
import styled from 'emotion/react';

import { getSearchEndpoint, formatSearchResults } from '../../helpers/tv-maze';
import Heading from '../Heading';
import TextInput from '../TextInput';
import ShowSearchResult from '../ShowSearchResult';


class AddShow extends Component {
  state = {
    status: 'idle',
    shows: [],
  }

  handleSearch = (query) => {
    this.setState({
      status: 'loading',
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

  render() {
    console.log(this.state);
    return (
      <div>
        <Heading>Add New Show</Heading>

        <TextInput
          onChange={this.handleSearch}
          changeDebounceTime={300}
        />

        <SearchResults>
          {this.state.shows.map(show => (
            <ShowSearchResult key={show.id} {...show} />
          ))}
        </SearchResults>
      </div>
    );
  }
}

const SearchResults = styled.div`
  position: relative;
`;

export default AddShow;

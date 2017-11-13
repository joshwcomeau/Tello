import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { addShowsRequest, hideModal } from '../../actions';
import { UNITS_IN_PX } from '../../constants';
import { getTrackedShowIds } from '../../reducers/tracked-shows.reducer';
import {
  getSearchEndpoint,
  formatShowResults,
} from '../../helpers/tv-maze.helpers';

import Button from '../Button';
import Heading from '../Heading';
import TextInput from '../TextInput';
import Spinner from '../Spinner';
import AddShowSearchResults from '../AddShowSearchResults';

import { getButtonText } from './AddShow.helpers';

class AddShow extends Component {
  static propTypes = {
    previouslyTrackedShowIds: PropTypes.arrayOf(PropTypes.number),
    addShowsRequest: PropTypes.func.isRequired,
  };

  state = {
    status: 'idle',
    shows: [],
    selectedShowIds: [],
  };

  handleSearch = query => {
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
      .then(formatShowResults)
      .then(shows => {
        this.setState({
          status: 'done',
          shows: shows,
        });
      })
      .catch(console.error);
  };

  handleToggleShow = id => {
    const { selectedShowIds } = this.state;

    let nextShowIds;

    if (selectedShowIds.includes(id)) {
      nextShowIds = selectedShowIds.filter(selectedId => selectedId !== id);
    } else {
      nextShowIds = [...selectedShowIds, id];
    }

    this.setState({ selectedShowIds: nextShowIds });
  };

  handleFinishButton = () => {
    const { selectedShowIds, shows } = this.state;

    const selectedShows = selectedShowIds.map(id =>
      shows.find(show => show.id === id)
    );

    // Dispatch the action which will persist this selection to the server.
    this.props.addShowsRequest({ shows: selectedShows });

    // Close and reset this modal.
    this.props.hideModal({ side: 'right' });
    this.setState({
      status: 'idle',
      shows: [],
      selectedShowIds: [],
    });
  };

  render() {
    const numOfShowsSelected = this.state.selectedShowIds.length;
    const isLoading = this.state.status === 'loading';

    return (
      <Wrapper>
        <Header>
          <Heading>Add New Show</Heading>

          <TextInput
            focusOnMount
            placeholder="eg. Game of Thrones"
            onChange={this.handleSearch}
            changeDebounceTime={300}
          />
        </Header>

        <Flex>
          {isLoading && (
            <Center>
              <Spinner fadeInDuration={100} />
            </Center>
          )}

          <AddShowSearchResults
            status={this.state.status}
            shows={this.state.shows}
            previouslyTrackedShowIds={this.props.previouslyTrackedShowIds}
            onToggleShow={this.handleToggleShow}
            style={{ flex: 1 }}
          />
        </Flex>

        <Button
          fill
          size="large"
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

const Header = styled.header`
  margin-bottom: ${UNITS_IN_PX[3]};
`;

const Flex = styled.div`
  flex: 1;
  margin-bottom: ${UNITS_IN_PX[2]};
  overflow: auto;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = state => ({
  previouslyTrackedShowIds: getTrackedShowIds(state),
});

const mapDispatchToProps = { addShowsRequest, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(AddShow);

import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { ShowProps } from '../../types';

import AddShowSearchResult from '../AddShowSearchResult';

const propTypes = {
  status: PropTypes.oneOf(['idle', 'loading', 'done']),
  shows: PropTypes.arrayOf(ShowProps),
  previouslyTrackedShowIds: PropTypes.arrayOf(PropTypes.number),
  onToggleShow: PropTypes.func.isRequired,
};

const AddShowSearchResults = ({
  status,
  shows,
  previouslyTrackedShowIds,
  onToggleShow,
}) => {
  return (
    <Wrapper>
      {shows.map(show => (
        <AddShowSearchResult
          key={show.id}
          show={show}
          isAlreadyAdded={previouslyTrackedShowIds.includes(show.id)}
          onToggleShow={onToggleShow}
        />
      ))}
    </Wrapper>
  );
};

AddShowSearchResults.propTypes = propTypes;

const Wrapper = styled.div`
  position: relative;
`;

export default AddShowSearchResults;

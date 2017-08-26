import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { UNITS_IN_PX } from '../../constants';
import { ShowProps } from '../../types';

import ShowSearchResult from '../ShowSearchResult';


const propTypes = {
  status: PropTypes.oneOf(['idle', 'loading', 'done']),
  shows: PropTypes.arrayOf(ShowProps),
  onToggleShow: PropTypes.func.isRequired,
};

const ShowSearchResults = ({ status, shows, onToggleShow }) => {
  return (
    <Wrapper>
      {shows.map(show => (
        <ShowSearchResult
          key={show.id}
          show={show}
          isAlreadyAdded={false /* TODO */}
          onToggleShow={onToggleShow}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: ${UNITS_IN_PX[4]};
`

export default ShowSearchResults;

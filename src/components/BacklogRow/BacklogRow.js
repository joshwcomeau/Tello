import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'emotion/react';

import { COLORS } from '../../constants';


const propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    episodes: PropTypes.arrayOf(PropTypes.shape({
      season: PropTypes.number.isRequired,
      episode: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }),
};

const Wrapper = styled.div`
  background: ${COLORS.white};
  box-shadow: 1px 0px 3px rgba(0,0,0,0.9);
`

class BacklogRow extends Component {
  static propTypes = propTypes

  render() {
    const { show: { image, name } } = this.props;

    return (
      <Wrapper>
        {name}
      </Wrapper>
    );
  }
}

export default BacklogRow;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';

import Episode from '../Episode';


const ROW_HEIGHT = 75;

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
  color: ${COLORS.black};
  background: ${COLORS.white};
  box-shadow: 1px 0px 3px rgba(0,0,0,0.9);
`;

const Row = styled.div`
  display: flex;
`;

const ShowImage = styled.img`
  display: block;
  width: ${ROW_HEIGHT + 'px'};
  height: ${ROW_HEIGHT + 'px'};
  border: 2px solid ${COLORS.white};
  object-fit: cover;
  object-position: top center;
`;

const ShowDetails = styled.div`
  display: block;
  padding: ${UNITS_IN_PX[1]};
  width: 250px;
`;

const ShowName = styled.h4`
  font-size: 22px;
  font-weight: bold;
`;

const getTagBackgroundColor = tag => {
  switch (tag) {
    case 'Reality': return COLORS.blue.dark;
    default: return COLORS.gray.dark;
  }
}

const TypeTag = styled.span`
  display: inline-block;
  border-radius: 20px;
  font-size: 10px;
  color: ${COLORS.white};
  background: ${props => getTagBackgroundColor(props.children)};
  padding: 2px 6px;
`;

const EpisodeWrapper = styled.div`
  flex: 1;
  padding: ${HALF_UNIT_PX};
  overflow: hidden;
  white-space: nowrap;
`

class BacklogRow extends Component {
  static propTypes = propTypes

  render() {
    const { show: { image, name, episodes } } = this.props;

    return (
      <Wrapper>
        <Row>
          <ShowDetails>
            <ShowName>{name}</ShowName>
            <TypeTag>Reality</TypeTag>
          </ShowDetails>

          <EpisodeWrapper>
            {episodes.slice(0, 4).map(episode => (
              <Episode
                height={ROW_HEIGHT}
                season={episode.season}
                number={episode.number}
                name={episode.name}
              />
            ))}
          </EpisodeWrapper>
        </Row>
      </Wrapper>
    );
  }
}

export default BacklogRow;

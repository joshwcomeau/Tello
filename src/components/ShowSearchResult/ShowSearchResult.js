import React, { Component } from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { truncateStringByWordCount } from '../../utils';
import { ShowProps } from '../../types';

import Heading from '../Heading';
import ShowImage from '../ShowImage';
import AddShowButton from '../AddShowButton';


const propTypes = {
  show: ShowProps,
  isAlreadyAdded: PropTypes.bool,
};

class ShowSearchResult extends Component {
  state = {
    isHovering: false,
  }

  handleMouseEnter = () => this.setState({ isHovering: true })
  handleMouseLeave = () => this.setState({ isHovering: false })

  render() {
    const { isHovering } = this.state;
    const { show: { id, name, image, status, type, summary } } = this.props;

    return (
      <Wrapper
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ImageContainer>
          <ShowImage name={name} src={image} />
        </ImageContainer>

        <MainContent>
          <Heading size="small">{name}</Heading>
          <Summary>{truncateStringByWordCount(summary, 30)}</Summary>
        </MainContent>
        <AddShowButton
          onClick={function() {}}
          color={isHovering
            ? COLORS.green.primary
            : COLORS.lime.dark
          }
        />
      </Wrapper>
    );
  }
}

const HEIGHT_IN_UNITS = 7;

const Wrapper = styled.div`
  display: flex;
  height: ${UNITS_IN_PX[HEIGHT_IN_UNITS]};
  padding: ${UNITS_IN_PX[1]};
  margin-bottom: ${UNITS_IN_PX[1]}
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.gray.light};
`;

const MainContent = styled.div`
  flex: 1;
`;

const Summary = styled.p`
  padding: ${HALF_UNIT_PX} 0;
  font-size: 13px;
`

const ImageContainer = styled.div`
  height: 100%;
  margin-right: ${UNITS_IN_PX[1]};
`;

const AddButton = styled.button`
  width: ${UNITS_IN_PX[HEIGHT_IN_UNITS]};
  height: ${UNITS_IN_PX[HEIGHT_IN_UNITS]};
  margin-left: ${UNITS_IN_PX[1]};
  background: ${COLORS.green.primary};
  color: ${COLORS.white};
  cursor: pointer;
  font-size: 44px;
  font-family: 'Raleway';
  border: none;
`;

ShowSearchResult.propTypes = propTypes;

export default ShowSearchResult;

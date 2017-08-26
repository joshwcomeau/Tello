import React, { Component } from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { truncateStringByWordCount } from '../../utils';
import { ShowProps } from '../../types';

import Heading from '../Heading';
import Tag from '../Tag';
import AddShowButton from '../AddShowButton';
import Checkbox from '../Checkbox';

import { getColorForStatus } from './ShowSearchResult.helpers';


const propTypes = {
  show: ShowProps,
  isAlreadyAdded: PropTypes.bool,
  onToggleShow: PropTypes.func.isRequired,
};

class ShowSearchResult extends Component {
  state = {
    isHovering: false,
    isSelected: false,
  }

  handleMouseEnter = () => this.setState({ isHovering: true })
  handleMouseLeave = () => this.setState({ isHovering: false })
  handleClick = () => {
    this.setState({ isSelected: !this.state.isSelected });

    this.props.onToggleShow(this.props.show.id);
  }

  render() {
    const { isHovering, isSelected } = this.state;
    const { show: { id, name, image, status, type, summary } } = this.props;

    return (
      <Wrapper
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <Checkbox highlighted={isHovering} checked={isSelected} />
        <MainContent>
          <Heading size="small">{name}</Heading>
        </MainContent>
        <DevelopmentStatus status={status}>
          {status}
        </DevelopmentStatus>
      </Wrapper>
    );
  }
}

const HEIGHT_IN_UNITS = 3;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: ${UNITS_IN_PX[1]};
  height: ${UNITS_IN_PX[HEIGHT_IN_UNITS]};
  transform: translateY(-2px);
`;

const DevelopmentStatus = styled.div`
  font-size: 12px;
  color: ${getColorForStatus};
`;

ShowSearchResult.propTypes = propTypes;

export default ShowSearchResult;

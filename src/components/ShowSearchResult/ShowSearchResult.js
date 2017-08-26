import React, { Component } from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import { COLORS, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { truncateStringByWordCount } from '../../utils';
import { ShowProps } from '../../types';

import Heading from '../Heading';
import Tag from '../Tag';
import AddShowButton from '../AddShowButton';


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
        <Status isRunning={status === 'Running'}>{status}</Status>
      </Wrapper>
    );
  }
}

const HEIGHT_IN_UNITS = 3;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
`;

const getCheckboxBorder = props => (
  `2px solid ${
    (props.highlighted || props.checked)
      ? COLORS.blue.primary
      : COLORS.gray.dark
  }`
);

const getCheckboxBackground = props => (
  props.checked ? COLORS.blue.primary : 'transparent'
);

const Checkbox = styled.div`
  width: 15px;
  height: 15px;
  margin-right: ${UNITS_IN_PX[1]};
  border: ${getCheckboxBorder};
  background: ${getCheckboxBackground}
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

const Status = styled.div`
  font-size: 12px;
  color: ${props => props.isRunning ? COLORS.green.primary : COLORS.gray.primary};
`;

ShowSearchResult.propTypes = propTypes;

export default ShowSearchResult;

import React, { Component } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { ShowProps } from '../../types';

import Checkbox from '../Checkbox';
import Subheading from '../Subheading';
import ShowStatus from '../ShowStatus';

const propTypes = {
  show: ShowProps,
  isAlreadyAdded: PropTypes.bool,
  onToggleShow: PropTypes.func.isRequired,
};

class AddShowSearchResult extends Component {
  state = {
    isHovering: false,
    isSelected: false,
  };

  handleMouseEnter = () => this.setState({ isHovering: true });
  handleMouseLeave = () => this.setState({ isHovering: false });
  handleClick = () => {
    this.setState({ isSelected: !this.state.isSelected });

    this.props.onToggleShow(this.props.show.id);
  };

  render() {
    const { isHovering, isSelected } = this.state;
    const { show: { name, status, region }, isAlreadyAdded } = this.props;

    return (
      <Wrapper
        deEmphasize={isAlreadyAdded}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={!isAlreadyAdded && this.handleClick}
      >
        <Checkbox
          disabled={isAlreadyAdded}
          highlighted={isHovering}
          checked={isSelected || isAlreadyAdded}
        />

        <MainContent>
          <ShowNameAndRegion size="small">
            {name}
            {region && <Region>({region})</Region>}
          </ShowNameAndRegion>
          {isAlreadyAdded && (
            <Subheading size="small">Already Tracking</Subheading>
          )}
        </MainContent>

        <ShowStatus status={status}>{status}</ShowStatus>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  opacity: ${props => (props.deEmphasize ? 0.5 : 1)};
  user-select: none;
  padding-right: ${HALF_UNIT_PX};
`;

const MainContent = styled.div`
  flex: 1;
  padding-top: ${HALF_UNIT_PX};
  padding-bottom: ${HALF_UNIT_PX};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: ${UNITS_IN_PX[1]};
`;

const ShowNameAndRegion = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Region = styled.span`
  display: inline-block;
  margin-left: ${UNITS_IN_PX[1]};
  font-weight: normal;
  font-size: 18px;
  opacity: 0.5;
`;

AddShowSearchResult.propTypes = propTypes;

export default AddShowSearchResult;

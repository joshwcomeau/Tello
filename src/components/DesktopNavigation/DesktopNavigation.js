import React, { Component } from 'react';
import styled from 'emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {  UNITS_IN_PX } from '../../constants';

import NavigationHeading from '../NavigationHeading';


class DesktopNavigation extends Component {
  static propTypes = {
    activeSection: PropTypes.oneOf(['summary', 'backlog', 'calendar']),
  }

  render() {
    const { activeSection } = this.props;

    const headings = ['Summary', 'Backlog', 'Calendar'];

    return (
      <Wrapper>
        {headings.map(heading => (
          <NavigationHeading
            name={heading}
            href={`/${heading.toLowerCase()}`}
            isActive={activeSection === heading.toLowerCase()}
          />
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${UNITS_IN_PX[1]};
`;

export default DesktopNavigation;

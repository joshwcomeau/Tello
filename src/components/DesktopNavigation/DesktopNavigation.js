import React from 'react';
import styled from 'react-emotion';

import { UNITS_IN_PX } from '../../constants';

import NavigationHeading from '../NavigationHeading';

const DesktopNavigation = () => (
  <Wrapper>
    {['summary', 'backlog', 'calendar', 'settings'].map(heading => (
      <NavigationHeading key={heading} value={heading} />
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${UNITS_IN_PX[1]};
`;

export default DesktopNavigation;

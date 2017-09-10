import React, { Component } from 'react';
import styled from 'emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {  UNITS_IN_PX } from '../../constants';

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

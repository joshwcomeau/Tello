import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'emotion/react';

import { COLORS } from '../../constants';

export default styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${props => props.white ? COLORS.white : COLORS.blue.light};
  font-weight: ${props => props.strong ? 'bold' : 'inherit'};

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: ${props => props.white ? COLORS.white : COLORS.blue.light};
    opacity: 0;
    transition: opacity 500ms;
  }

  &:hover:after {
    opacity: 1;
    transition: opacity 150ms;
  }
`;

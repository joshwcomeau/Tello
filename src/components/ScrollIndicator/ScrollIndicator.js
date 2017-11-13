import React from 'react';
import { keyframes } from 'emotion';
import styled from 'react-emotion';

import { COLORS } from '../../constants';

const ScrollIndicator = () => {
  return <ScrollIndicatorElem />;
};

const scrollAnimation = keyframes`
  0% {
    opacity: 0;
  }

  20% {
    opacity: 1;
    transform: translateY(0);
  }

  60% {
    opacity: 1;
    transform: translateY(8px);
  }

  80% {
    opacity: 0;
    transform: translateY(8px);
  }

  100% {
    opacity: 0;
    transform: translateY(8px);
  }
`;

const ScrollIndicatorElem = styled.div`
  width: 30px;
  height: 50px;
  border-radius: 12px;
  border: 2px solid ${COLORS.white};
  background: rgba(255, 255, 255, 0.35);

  &:after {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background: ${COLORS.white};
    animation: ${scrollAnimation} 2500ms infinite;
  }
`;

export default ScrollIndicator;

import React from 'react';
import styled from 'emotion/react';

import { BREAKPOINT_SIZES } from '../../constants';

const HideOn = ({ mobile, desktop, children }) => {
  const isMobileScreenSize = window.innerWidth < BREAKPOINT_SIZES.sm;

  if (mobile && isMobileScreenSize) {
    return null;
  }

  if (desktop && !isMobileScreenSize) {
    return null;
  }

  return children;
};

export default HideOn;

import { BREAKPOINT_SIZES, isMobileUserAgent } from '../constants';

export const getBreakpointFor = (windowWidth) => (
  Object.keys(BREAKPOINT_SIZES).find(name => (
    windowWidth <= BREAKPOINT_SIZES[name]
  )) || 'xl'
);

export const isMobile = (breakpoint) => {
  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  return breakpoint === 'xs' ||
  breakpoint === 'sm' ||
  isMobileUserAgent
};

export const isLargeScreen = (breakpoint) => {
  if (!breakpoint) {
    breakpoint = getBreakpointFor(window.innerWidth);
  }

  console.log("Got breakpoint", breakpoint)

  return breakpoint === 'lg' || breakpoint === 'xl';
}

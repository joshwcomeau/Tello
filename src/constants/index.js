import { range } from '../utils';


// TODO: Dedupe with the value in server/config/defaults.json
export const AUTH_TOKEN_KEY = 'tvAuthToken';

export const MODAL_IDS = {
  addShow: 'addShow',
};

export const COLORS = {
  orange: {
    primary: '#FF9100',
  },
  deepOrange: {
    primary: '#FF3D00',
  },
  red: {
    primary: '#FF1744',
    dark: '#D50000',
  },
  pink: {
    light: '#FF4081',
    primary: '#ee0079',
  },
  purple: {
    primary: '#D500F9',
    dark: '#AA00FF',
  },
  deepPurple: {
    primary: '#651FFF',
    dark: '#5000bf',
  },
  blue: {
    primary: '#2979FF',
    dark: '#2962FF',
  },
  cyan: {
    primary: '#00E5FF',
    dark: '#00B8D4',
  },
  teal: {
    primary: '#1DE9B6',
    dark: '#00BFA5',
  },
  green: {
    primary: '#00C853',
  },
  lime: {
    primary: '#C6FF00',
    dark: '#AEEA00',
  },
  gray: {
    veryLight: '#F4F4F4',
    light: '#CCCCCC',
    primary: '#777777',
    dark: '#424242',
    veryDark: '#1F1D1D',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Media queries
export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 750,
  md: 1100,
  lg: 1600,
};
export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
};

// Sizes
export const UNIT = 15;

export const UNITS_IN_PX = range(30).map(i => UNIT * i + 'px');

export const HALF_UNIT = UNIT / 2;
export const HALF_UNIT_PX = HALF_UNIT + 'px';

export const ROW_HEIGHT = UNIT * 5;
export const ROW_HEIGHT_PX = ROW_HEIGHT + 'px';

export const MAX_WIDTH = {
  sm: '100%',
  md: '900px',
  base: '1110px',
};

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
  navigator.userAgent
);

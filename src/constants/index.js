export const COLORS = {
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
  },
  blue: {
    primary: '#2979FF',
    dark: '#2962FF',
  },
  gray: {
    light: '#EEEEEE',
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

export const UNITS_IN_PX = [
  null,
  UNIT * 1 + 'px',
  UNIT * 2 + 'px',
  UNIT * 3 + 'px',
  UNIT * 4 + 'px',
  UNIT * 5 + 'px',
  UNIT * 6 + 'px',
  UNIT * 7 + 'px',
  UNIT * 8 + 'px',
  UNIT * 9 + 'px',
  UNIT * 10 + 'px',
  UNIT * 11 + 'px',
  UNIT * 12 + 'px',
  UNIT * 13 + 'px',
  UNIT * 14 + 'px',
  UNIT * 15 + 'px',
  UNIT * 16 + 'px',
  UNIT * 17 + 'px',
  UNIT * 18 + 'px',
  UNIT * 19 + 'px',
  UNIT * 20 + 'px',
];

export const HALF_UNIT = Math.round(UNIT / 2);
export const HALF_UNIT_PX = HALF_UNIT + 'px';

export const ROW_HEIGHT = UNIT * 5;
export const ROW_HEIGHT_PX = ROW_HEIGHT + 'px';

export const MAX_WIDTH = {
  sm: '100%',
  md: '900px',
  base: '1100px',
};

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
  navigator.userAgent
);

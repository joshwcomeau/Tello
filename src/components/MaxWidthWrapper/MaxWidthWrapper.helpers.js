import { UNITS_IN_PX } from '../../constants';
import { isMobile } from '../../helpers/responsive.helpers';

export const getPadding = ({ noPadding, noPaddingOnMobile }) => {
  if (noPadding) {
    return 0;
  }

  if (isMobile() && noPaddingOnMobile) {
    return 0;
  }

  return isMobile() ? UNITS_IN_PX[1] : UNITS_IN_PX[2];
};

import { spring } from 'react-motion';

import { MODAL_IDS } from '../../constants';

import AddShow from '../AddShow';
import EditShow from '../EditShow';
import LoggedOutMenu from '../LoggedOutMenu';

export const getSpring = (side, isVisible) => {
  // For right modals, we position them off-screen by translating x 100%.
  // For left, we translate by -100% (since it has to move past the left edge).
  const offscreenValue = side === 'right' ? 100 : -100;

  return spring(isVisible ? 0 : offscreenValue);
};

export const getModalChildComponent = selectedModalId => {
  switch (selectedModalId) {
    case MODAL_IDS.editShow:
      return EditShow;
    case MODAL_IDS.addShow:
      return AddShow;
    case MODAL_IDS.mobileLoggedOutMenu:
      return LoggedOutMenu;
    default:
      return null;
  }
};

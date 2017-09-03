import { spring } from 'react-motion';


export const getSpring = (side, isVisible) => {
  // For right modals, we position them off-screen by translating x 100%.
  // For left, we translate by -100% (since it has to move past the left edge).
  const offscreenValue = side === 'right' ? 100 : -100;

  return spring(isVisible ? 0 : offscreenValue);
}

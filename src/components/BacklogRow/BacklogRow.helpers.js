import { COLORS } from '../../constants';

export const getTagBackgroundColor = tag => {
  switch (tag) {
    case 'Reality':
      return COLORS.blue.dark;
    default:
      return COLORS.gray.dark;
  }
};

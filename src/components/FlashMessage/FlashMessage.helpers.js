import { COLORS } from '../../constants';

export const getColorForMessageType = ({ type }) => {
  switch (type) {
    case 'alert': return COLORS.orange.primary;
    case 'error': return COLORS.red.primary;
    case 'success': return COLORS.green.primary;
    default: return COLORS.gray.dark;
  }
};

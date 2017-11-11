import { COLORS } from '../../constants';

export const getColorForStatus = ({ status }) => {
  switch (status) {
    case 'Running':
      return COLORS.green.primary;

    case 'To Be Determined':
      return COLORS.deepOrange.primary;

    case 'In Development':
      return COLORS.blue.primary;

    case 'Ended':
    default:
      return COLORS.gray.primary;
  }
};

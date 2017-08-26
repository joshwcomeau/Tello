import { COLORS } from '../../constants';

export const getColorForStatus = ({ status }) => {
  switch (status) {
    case 'Running':
      return COLORS.green.primary;

    case 'To Be Determined':
    case 'In Development':
      return COLORS.blue.primary;

    case 'Ended':
    default:
      return COLORS.gray.primary;
  }
}

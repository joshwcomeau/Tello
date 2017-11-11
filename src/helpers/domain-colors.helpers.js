import { COLORS } from '../constants';

const domainColors = {
  reality: COLORS.purple.primary,
  animation: COLORS.deepOrange.primary,
  scripted: COLORS.deepPurple.primary,
  gameshow: COLORS.pink.primary,
  default: COLORS.gray.dark,
};

const getDomainColor = (domain = 'default') =>
  domainColors[domain.toLowerCase().replace(/\s/, '')] || domainColors.default;

export default getDomainColor;

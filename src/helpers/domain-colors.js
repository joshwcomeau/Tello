import { COLORS } from '../constants';


const domainColors = {
  reality: {
    baseColor: COLORS.blue.primary,
    highlightColor: COLORS.deepPurple.primary,
  },
  default: {
    baseColor: COLORS.gray.primary,
    highlightColor: COLORS.gray.dark,
  },
};

const getDomainColor = (domain = 'default') => (
  domainColors[domain.toLowerCase()] || domainColors.default
);

export default getDomainColor;

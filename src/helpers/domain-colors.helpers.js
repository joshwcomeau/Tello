import { COLORS } from '../constants';


const domainColors = {
  reality: {
    baseColor: COLORS.blue.primary,
    highlightColor: COLORS.deepPurple.primary,
  },
  animation: {
    baseColor: COLORS.teal.dark,
    highlightColor: COLORS.green.primary,
  },
  scripted: {
    baseColor: COLORS.purple.primary,
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

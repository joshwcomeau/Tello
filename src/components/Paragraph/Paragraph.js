import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { BREAKPOINTS, UNITS_IN_PX } from '../../constants';

const getBottomMargin = ({ size }) => {
  switch (size) {
    case 'small':
    case 'medium':
      return UNITS_IN_PX[1];
    case 'large':
      return UNITS_IN_PX[2];
    case 'xlarge':
      return UNITS_IN_PX[2];
    default:
      getBottomMargin('medium');
  }
};
const getFontSize = ({ size }) => {
  switch (size) {
    case 'small':
      return '14px';
    case 'medium':
      return '17px';
    case 'large':
      return '22px';
    case 'xlarge':
      return '28px';
    default:
      getFontSize('medium');
  }
};

const getFontSizeMobile = ({ size }) => {
  switch (size) {
    case 'small':
      return '14px';
    case 'medium':
      return '16px';
    case 'large':
      return '18px';
    case 'xlarge':
      return '24px';
    default:
      getFontSize('medium');
  }
};

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

const defaultProps = {
  size: 'medium',
  align: 'left',
};

const Paragraph = styled.p`
  margin-bottom: ${getBottomMargin};
  font-size: ${getFontSize};
  text-align: ${props => props.align};
  line-height: 1.5;

  @media ${BREAKPOINTS.sm} {
    font-size: ${getFontSizeMobile};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;

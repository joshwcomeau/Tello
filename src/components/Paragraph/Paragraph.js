import PropTypes from 'prop-types';
import styled from 'emotion/react';


import { UNITS_IN_PX } from '../../constants';


const getBottomMargin = ({ size }) => {
  switch (size) {
    case 'small':
    case 'medium': return UNITS_IN_PX[1];
    case 'large': return UNITS_IN_PX[2];
    case 'xlarge': return UNITS_IN_PX[2];
  }
}
const getFontSize = ({ size }) => {
  switch (size) {
    case 'small': return '14px';
    case 'medium': return '17px';
    case 'large': return '22px';
    case 'xlarge': return '28px';
  }
}

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  centered: PropTypes.bool,
};

const defaultProps = {
  size: 'medium',
};

const Paragraph = styled.p`
  margin-bottom: ${getBottomMargin};
  font-size: ${getFontSize};
  text-align: ${props => props.centered ? 'center' : 'left'};
  line-height: 1.5;
`;

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export default Paragraph;

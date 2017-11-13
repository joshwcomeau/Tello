import PropTypes from 'prop-types';
import styled from 'react-emotion';

const propTypes = {
  size: PropTypes.number.isRequired,
};

const defaultProps = {
  size: 45,
};

const Spacer = styled.div`
  position: relative;
  height: ${props => props.size + 'px'};
`;

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;

import styled from 'react-emotion';
import PropTypes from 'prop-types';

const propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

const Backdrop = styled.div`
  position: absolute;
  z-index: inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 750ms;
`;

Backdrop.propTypes = propTypes;

export default Backdrop;

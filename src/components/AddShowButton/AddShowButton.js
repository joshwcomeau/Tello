import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { keyframes } from 'emotion';
import styled from 'react-emotion';

import { ROW_HEIGHT, ROW_HEIGHT_PX, COLORS } from '../../constants';
import { getNoShowsYet } from '../../reducers/tracked-shows.reducer';

const propTypes = {
  glowing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const AddShowButton = props => (
  <ButtonElem {...props}>
    {props.glowing && <Glow />}
    <Plus>+</Plus>
  </ButtonElem>
);

AddShowButton.propTypes = propTypes;

const ButtonElem = styled.button`
  position: relative;
  font-size: 96px;
  width: ${ROW_HEIGHT_PX};
  height: ${ROW_HEIGHT_PX};
  line-height: ${ROW_HEIGHT - 2 + 'px'};
  border: none;
  border-radius: 0;
  color: ${COLORS.white};
  background: ${COLORS.deepPurple.primary};
  font-family: 'Raleway';
  outline: none;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background: linear-gradient(
      to top,
      ${COLORS.deepPurple.primary},
      ${COLORS.deepPurple.light}
    );
  }
`;

const glowAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.5;
  }
`;

const Glow = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.blue.light};
  opacity: 0;
  animation: ${glowAnimation} 750ms alternate infinite;
`;

const Plus = styled.span`
  display: inline-block;
  position: relative;
  z-index: 2;
`;

const mapStateToProps = state => ({
  glowing: getNoShowsYet(state),
});

export default connect(mapStateToProps)(AddShowButton);

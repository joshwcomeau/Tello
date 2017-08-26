import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import {
  MODAL_IDS,
  ROW_HEIGHT,
  ROW_HEIGHT_PX,
  UNITS_IN_PX,
  COLORS
} from '../../constants';


const propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const AddShowButton = (props) => (
  <ButtonElem {...props}>
    +
  </ButtonElem>
);

AddShowButton.propTypes = propTypes;

const ButtonElem = styled.button`
  font-size: 96px;
  width: ${ROW_HEIGHT_PX};
  height: ${ROW_HEIGHT_PX};
  line-height: ${ROW_HEIGHT_PX};
  border: none;
  color: ${COLORS.white};
  background: ${props => props.color};
  font-family: 'Raleway';
  transition: background 300ms;
  outline: none;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background: ${props => props.hoverColor || props.color};
  }
`;


export default AddShowButton;

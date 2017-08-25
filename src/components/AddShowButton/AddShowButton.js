import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { showAddShowModal } from '../../actions';
import {
  MODAL_IDS,
  ROW_HEIGHT,
  ROW_HEIGHT_PX,
  UNITS_IN_PX,
  COLORS
} from '../../constants';


const AddShowButton = ({ showAddShowModal }) => (
  <ButtonElem onClick={showAddShowModal}>
    +
  </ButtonElem>
)


const gradientPurple = '#da00e0';

const ButtonElem = styled.button`
  font-size: 96px;
  box-sizing: content-box;
  width: ${ROW_HEIGHT_PX};
  height: ${ROW_HEIGHT_PX};
  line-height: ${ROW_HEIGHT_PX};
  border: none;
  color: ${COLORS.white};
  background: ${COLORS.purple.dark};
  font-family: 'Raleway';
  transition: background 300ms;
  outline: none;
  cursor: pointer;
  overflow: hidden;


  &:hover {
    background: ${COLORS.deepPurple.primary};
  }
`;


export default connect(null, { showAddShowModal })(AddShowButton);

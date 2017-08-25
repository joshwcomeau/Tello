import React, { Component } from 'react';
import styled from 'emotion/react';

import { ROW_HEIGHT, ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';


const AddShowButton = ({ toggleAddShowModal }) => (
  <ButtonElem>
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

`;


export default AddShowButton;

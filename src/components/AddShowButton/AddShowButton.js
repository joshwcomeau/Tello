import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import AddIcon from 'react-icons/lib/md/add';

import {
  ROW_HEIGHT,
  ROW_HEIGHT_PX,
  COLORS
} from '../../constants';


const propTypes = {
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


export default AddShowButton;

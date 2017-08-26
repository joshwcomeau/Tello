import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';


const Checkbox = ({ highlighted, checked, handleClick }) => {
  return (
    <div>
      <CheckboxElem
        highlighted={highlighted}
        checked={checked}
        onClick={handleClick}
      />
    </div>
  );
};

const getCheckboxBorder = props => (
  `2px solid ${
    (props.highlighted || props.checked)
      ? COLORS.blue.primary
      : COLORS.gray.dark
  }`
);

const getCheckboxBackground = props => (
  props.checked ? COLORS.blue.primary : 'transparent'
);

const CheckboxElem = styled.div`
  width: ${UNITS_IN_PX[1]};
  height: ${UNITS_IN_PX[1]};
  margin-right: ${UNITS_IN_PX[1]};
  border: ${getCheckboxBorder};
  background: ${getCheckboxBackground}
`;

export default Checkbox;

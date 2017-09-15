import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';


const Divider = () => {
  return (
    <DividerElem>
      <Dot color={COLORS.deepPurple.light} />
      <Dot color={COLORS.purple.primary} />
      <Dot color={COLORS.pink.primary} />
      <Dot color={COLORS.purple.primary} />
      <Dot color={COLORS.deepPurple.light} />
    </DividerElem>
  );
};

const DividerElem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${UNITS_IN_PX[2]};
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  margin-left: 7px;
  margin-right: 7px;
`;

export default Divider;

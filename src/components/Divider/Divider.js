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
  width: ${HALF_UNIT_PX};
  height: ${HALF_UNIT_PX};
  background-color: ${props => props.color};
  margin-left: ${UNITS_IN_PX[1]};
  margin-right: ${UNITS_IN_PX[1]};
`;

export default Divider;

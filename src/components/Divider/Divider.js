import React from 'react';
import styled from 'react-emotion';

import { UNITS_IN_PX } from '../../constants';

const Divider = () => {
  return (
    <DividerElem>
      <Bar />
    </DividerElem>
  );
};

const DividerElem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${UNITS_IN_PX[2]};
`;

const Bar = styled.div`
  width: 125px;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
`;

export default Divider;

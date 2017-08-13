import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Logo from '../Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';


const Header = () => {
  return (
    <HeaderElem>
      <MaxWidthWrapper style={{ height: '100%' }}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </MaxWidthWrapper>
    </HeaderElem>
  );
};

const HeaderElem = styled.header`
  position: relative;
  height: ${UNITS_IN_PX[8]};
  background: linear-gradient(${COLORS.pink.primary}, ${COLORS.purple.primary});
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: ${UNITS_IN_PX[2]};
  bottom: 0;
`;

export default Header;

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
  height: ${UNITS_IN_PX[9]};
  background: linear-gradient(${COLORS.pink.primary}, ${COLORS.purple.primary});
`;

const LogoWrapper = styled.div`
  position: absolute;
  height: ${UNITS_IN_PX[5]};
  left: ${UNITS_IN_PX[2]};
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

export default Header;

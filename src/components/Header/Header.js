import React from 'react';
import styled from 'emotion/react';

import { colors } from '../../constants';

import Logo from '../Logo';


const HeaderElem = styled.header`
  position: relative;
  height: 100px;
  background: linear-gradient(${colors.pink.primary}, ${colors.purple.primary});
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 25px;
  bottom: 0;
`

const Header = () => {
  return (
    <HeaderElem>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </HeaderElem>
  );
};

export default Header;

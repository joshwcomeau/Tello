import React from 'react';
import styled from 'emotion/react';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';


const Logo = () => {
  return (
    <LogoContainer href="/">
      <LogoElem>
        Tello
      </LogoElem>
    </LogoContainer>
  );
};

/*
  NOTE: hardcoding these colours, so that it mimics the gradient it sits
  in front of. Because the text isn't 100% of the height, we can't simply
  use the color vars. TODO: Use some sort of color lib to determine this,
  based on a % mix between the two colors
*/
const gradientPink = '#e90091';
const gradientPurple = '#da00e0';

const LogoElem = styled.h1`
  font-size: 64px;
  font-weight: bold;
  height: ${ROW_HEIGHT_PX};
  line-height: ${ROW_HEIGHT_PX};
  width: ${UNITS_IN_PX[15]};
  text-align: center;
  letter-spacing: -1px;
  font-family: 'Raleway';
  background:  linear-gradient(${gradientPink}, ${gradientPurple});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoContainer = styled.a`
  display: inline-block;
  background: ${COLORS.gray.veryDark};
  text-decoration: none;
`;

export default Logo;

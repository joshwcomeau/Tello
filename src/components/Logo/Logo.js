import React from 'react';
import styled from 'emotion/react';

import { colors } from '../../constants';

const LogoElem = styled.h1`
  font-size: 64px;
  font-weight: normal;
  line-height: 50px;
  letter-spacing: -1px;
  font-family: 'Raleway';
  /*
    NOTE: hardcoding these colours, so that it mimics the gradient it sits
    in front of. Because the text isn't 100% of the height, we can't simply
    use the color vars. TODO: Use some sort of color lib to determine this,
    based on a % mix between the two colors
  */
  background: linear-gradient(#e90092, #da00df);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoContainer = styled.div`
  display: inline-block;
  background: ${colors.gray.dark};
  padding: 12px;
`

const Logo = () => {
  return (
    <LogoContainer>
      <LogoElem>
        Tevion
      </LogoElem>
    </LogoContainer>
  );
};

export default Logo;

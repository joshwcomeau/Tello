import React from 'react';
import styled from 'emotion/react';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';


const Logo = () => {
  return (
    <LogoContainer>
      <LogoElem>
        Castor
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

const LogoContainer = styled.div`
  display: inline-block;
  background: ${COLORS.gray.veryDark};
`;

// const LetterAUppercase = styled.span`
//   letter-spacing: -6px;
//   &:before {
//     content: 'A';
//   }
// `;
//
// const LetterV = styled.span`
//   letter-spacing: -1px;
//   &:before {
//     content: 'v';
//   }
// `;
//
// const LetterI = styled.span`
//   letter-spacing: -1px;
//   &:before {
//     content: 'i';
//   }
// `;
//
// const LetterA = styled.span`
//   letter-spacing: -2px;
//   &:before {
//     content: 'a';
//   }
// `;
//
// const LetterT = styled.span`
//   letter-spacing: -2px;
//   &:before {
//     content: 't';
//   }
// `;
//
// const LetterO = styled.span`
//   letter-spacing: -1px;
//   &:before {
//     content: 'o';
//   }
// `;

export default Logo;

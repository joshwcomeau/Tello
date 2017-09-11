import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Logo from '../Logo';


const GRADIENT_ANGLE = '-15deg';
const LandingPageHero = () => (
  <Wrapper>
    <LogoWrapper>
      <Logo
        boxColor={COLORS.white}
        background={`linear-gradient(
          ${GRADIENT_ANGLE},
          #b019fa,
          ${COLORS.pink.primary}
        )`}
      />
    </LogoWrapper>
    <div>
      <Tagline>
        <Emoji>🐣</Emoji>
        Modern TV Tracking.<br />
        Simple and delightful.
      </Tagline>
    </div>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: linear-gradient(
    -15deg,
    ${COLORS.cyan.primary},
    ${COLORS.blue.primary} 35%,
    ${COLORS.purple.primary} 90%,
    ${COLORS.pink.primary} 110%
  );
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: ${UNITS_IN_PX[2]};
  left: ${UNITS_IN_PX[2]};
  transform: scale(0.75);
  transform-origin: left top;
`;

const Tagline = styled.h3`
  position: relative;
  color: ${COLORS.white};
  font-size: 48px;
  line-height: 72px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
`;

const Emoji = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  font-size: 72px;
  transform: translateY(-125%);
`;

export default LandingPageHero;

import React from 'react';
import styled from 'emotion/react';

import { BREAKPOINTS, COLORS, UNITS_IN_PX } from '../../constants';
import { random, range } from '../../utils';

import Drift from '../Drift';
import Logo from '../Logo';
import LandingPageParticles from '../LandingPageParticles';


const getInitialDriftPosition = () => ({
  initialX: random(0, window.innerWidth),
  initialY: random(0, window.innerHeight),
});

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

    <MainContent>
      <Tagline>
        <Emoji>🐣</Emoji>
        Introducing <Raleway>Tello</Raleway>
      </Tagline>
      <SubTagline>
        A <strong>simple</strong> and <strong>delightful</strong> way
        <br />
        to track and manage TV shows.
      </SubTagline>
    </MainContent>

    <LandingPageParticles />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  color: ${COLORS.white};
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
  z-index: 1;
  top: ${UNITS_IN_PX[2]};
  left: ${UNITS_IN_PX[2]};
  transform: scale(0.75);
  transform-origin: left top;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 3;

  @media ${BREAKPOINTS.sm} {
    margin-top: 15%;
  }
`;

const Tagline = styled.h3`
  position: relative;
  font-size: 56px;
  line-height: 80px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: ${UNITS_IN_PX[1]};

  @media ${BREAKPOINTS.xl} {
    font-size: 48px;
    line-height: 72px;
  }
  @media ${BREAKPOINTS.md} {
    font-size: 36px;
    line-height: 54px;
  }

  @media ${BREAKPOINTS.sm} {
    font-size: 32px;
    line-height: 50px;
  }

  @media ${BREAKPOINTS.xs} {
    font-size: 28px;
    line-height: 50px;
  }
`;

const SubTagline = styled.h5`
  position: relative;
  font-size: 38px;
  font-weight: normal;

  @media ${BREAKPOINTS.xl} {
    font-size: 32px;
  }
  @media ${BREAKPOINTS.md} {
    font-size: 28px;
  }

  @media ${BREAKPOINTS.sm} {
    font-size: 22px;
  }

  @media ${BREAKPOINTS.xs} {
    font-size: 18px;
  }
`

const Emoji = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  font-size: 96px;
  transform: translateY(-125%);

  @media ${BREAKPOINTS.xl} {
    font-size: 72px;
  }
`;

const Raleway = styled.span`
  font-family: 'Raleway';
  font-size: 62px;
  letter-spacing: -1px;

  @media ${BREAKPOINTS.xl} {
    font-size: 56px;
    line-height: 72px;
  }
  @media ${BREAKPOINTS.md} {
    font-size: 42px;
    line-height: 54px;
  }

  @media ${BREAKPOINTS.sm} {
    font-size: 36px;
    line-height: 54px;
  }

  @media ${BREAKPOINTS.xs} {
    font-size: 32px;
    line-height: 54px;
  }
`;

export default LandingPageHero;

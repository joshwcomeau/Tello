import React from 'react';
import styled from 'emotion/react';

import { Z_INDICES } from '../../constants';

import LandingPageHero from '../LandingPageHero';
import LandingPageSummary from '../LandingPageSummary';

// TEMP
import GoogleButton from '../GoogleButton';


const LandingPageView = () => [
  <LandingPageHero key="hero" />,
  <MainContent key="content">
    <LandingPageSummary />

    {/* TEMP */}
    <GoogleButton />
  </MainContent>,
];

const MainContent = styled.div`
  position: relative;
  z-index: ${Z_INDICES.root + 1};
`;

export default LandingPageView;

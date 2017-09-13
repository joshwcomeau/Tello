import React from 'react';
import styled from 'emotion/react';

import { COLORS } from '../../constants';

import Heading from '../Heading';
import Paragraph from '../Paragraph';


const LandingPageSummary = () => {
  return (
    <LandingPageSummaryElem>
      <Heading>Summary View</Heading>
      <Paragraph size="large">
        Your home screen in Tello is an overview of the shows you're tracking. An at-a-glance summary of how many episodes are left for your favourite shows.
      </Paragraph>

      <Paragraph size="large">
        Each square at the bottom of the cards represent an episode, and its colour indicates whether or not it's been viewed. Hover for more info!
      </Paragraph>
    </LandingPageSummaryElem>
  );
};

const LandingPageSummaryElem = styled.div`
  background: ${COLORS.gray.veryDark};
  min-height: 100vh;
`;

export default LandingPageSummary;

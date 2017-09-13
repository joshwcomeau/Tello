import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import { SummaryShow } from '../SummaryShow';

import { SHOWS } from './LandingPageSummary.data.js'


const LandingPageSummary = () => {
  return (
    <LandingPageSummaryElem>
      <MaxWidthWrapper>
        <Row>
          <Col colWidth={2}>
            <Heading theme="vibrant">Summary View</Heading>
            <Paragraph size="large">
              Your home screen in Tello is an overview of the shows you're tracking. An at-a-glance summary of how many episodes are left for your favourite shows.
            </Paragraph>

            <Paragraph size="large">
              Each square at the bottom of the cards represent an episode, and its colour indicates whether or not it's been viewed. Hover for more info!
            </Paragraph>
          </Col>

          <Col colWidth={1}>
            <ShowWrapper>
              <SummaryShow noManage show={SHOWS.strangerThings} />
              <Starburst />
            </ShowWrapper>
          </Col>
        </Row>
      </MaxWidthWrapper>
    </LandingPageSummaryElem>
  );
};

const LandingPageSummaryElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  background: ${COLORS.gray.veryDark};
  min-height: 100vh;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  flex: ${props => props.colWidth};

  &:first-of-type {
    margin-right: ${UNITS_IN_PX[5]};
  }
`;

const ShowWrapper = styled.div`
  position: relative;
  transform: perspective(600) rotateY(-20deg);
  transition: transform 350ms;

  &:hover {
    transform: rotateY(0deg);
  }
`;

const Starburst = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.pink.primary};
  filter: blur(50px);
  opacity: 0.75;
  z-index: -1;
`

export default LandingPageSummary;

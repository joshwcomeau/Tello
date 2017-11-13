import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { BREAKPOINTS, COLORS, UNITS_IN_PX } from '../../constants';

import Paragraph from '../Paragraph';
import FadeOnChange from '../FadeOnChange';
import MaxWidthWrapper from '../MaxWidthWrapper';
import SignupButtons from '../SignupButtons';

const FADE_DELAY = 4000;

class LandingPageIntro extends PureComponent {
  state = {
    tick: 0,
  };

  headings = [
    <span>
      "I wonder when <ShowNamePlaceholder /> comes back..."
    </span>,
    <span>"I need something to watch."</span>,
    <span>
      "Has the new season of <ShowNamePlaceholder /> started?"
    </span>,
    <span>
      "What episode of <ShowNamePlaceholder /> am I at?"
    </span>,
  ];

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState({ tick: (this.state.tick + 1) % this.headings.length });
    }, FADE_DELAY);
  }

  render() {
    const { tick } = this.state;

    return (
      <LandingPageIntroWrapper>
        <MaxWidthWrapper maxWidth="800px">
          <FadeOnChange duration={240}>
            <Question tick={tick}>{this.headings[tick]}</Question>
          </FadeOnChange>

          <Paragraph size="xlarge">
            Watching television is a leisure activity, but <em>finding</em>{' '}
            something to watch can be very un-leisurely.
          </Paragraph>

          <Paragraph size="xlarge">
            Tello is a fun, easy way to track your favourite TV shows, so you
            always have something to watch.
          </Paragraph>

          <Paragraph size="xlarge">
            Unlike other TV tracking services, Tello doesn't aspire to be a
            social network. Tello does 1 thing, and it does it very well.
          </Paragraph>

          <br />
          <Paragraph align="center" size="large">
            Sign up now, or continue reading to see what Tello has to offer.
          </Paragraph>

          <SignupButtons />
        </MaxWidthWrapper>
      </LandingPageIntroWrapper>
    );
  }
}

const ShowNamePlaceholder = styled.span`
  display: inline-block;
  width: 120px;
  border-bottom: 3px solid ${COLORS.white};
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  transform: translateY(3px);
`;

const LandingPageIntroWrapper = styled.div`
  position: relative;
  padding: ${UNITS_IN_PX[6]} 0 ${UNITS_IN_PX[8]};
  background: linear-gradient(rgba(109, 0, 185, 0.35), rgba(109, 0, 185, 0.65));
  color: ${COLORS.gray.veryLight};

  @media ${BREAKPOINTS.sm} {
    padding: ${UNITS_IN_PX[3]} 0 ${UNITS_IN_PX[4]};
  }
`;

const Question = styled.h1`
  font-size: 36px;
  color: ${COLORS.white};
  margin-bottom: ${UNITS_IN_PX[3]};
  /* Move back a few px so that we discount the width of the open-quote */
  transform: translateX(-4px);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.4);

  @media ${BREAKPOINTS.sm} {
    font-size: 26px;
  }
`;

export default LandingPageIntro;

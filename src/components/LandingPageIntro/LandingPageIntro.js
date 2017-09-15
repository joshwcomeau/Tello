import React, { PureComponent } from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';
import Paragraph from '../Paragraph';
import FadeOnChange from '../FadeOnChange';
import MaxWidthWrapper from '../MaxWidthWrapper';
import SignupButtons from '../SignupButtons';


const ShowNamePlaceholder = () => (
  <span style={{ letterSpacing: -3 }}>__________</span>
)
const HEADINGS = [
  <span>"I wonder when <ShowNamePlaceholder /> comes back..."</span>,
  <span>"I need something to watch."</span>,
  <span>"Has the new season of <ShowNamePlaceholder /> started?"</span>,
  <span>"What episode of <ShowNamePlaceholder /> am I at?"</span>,
];

const HEADING_COLOURS = [
  [COLORS.cyan.primary, '#00ccb2'],
  [COLORS.lime.primary, '#6ac202'],
  [COLORS.green.primary, "#11b100"],
  [COLORS.teal.primary, "#00aa48"],
];

const getHeadingBackground = ({ tick }) => (
  `linear-gradient(
    to bottom,
    ${HEADING_COLOURS[tick][0]},
    ${HEADING_COLOURS[tick][1]}
  )`
);

const FADE_DELAY = 4000;

class LandingPageIntro extends PureComponent {
  state = {
    tick: 0,
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState({ tick: (this.state.tick + 1) % HEADINGS.length });
    }, FADE_DELAY);
  }

  render() {
    const { tick } = this.state;

    return (
      <LandingPageIntroWrapper>
        <FadeOnChange>
          <Question tick={tick}>
            {HEADINGS[tick]}
          </Question>
        </FadeOnChange>

        <Paragraph size="xlarge">
          Watching television is a leisure activity, but often <em>finding</em> something to watch is anything but leisurely.
        </Paragraph>

        <Paragraph size="xlarge">
          Tello is a fun, easy way to track your favourite TV shows, so you always have something to watch.
        </Paragraph>

        <Paragraph size="xlarge">
          Unlike other TV tracking services, Tello doesn't aspire to be a social network. Tello does 1 thing, and it does it very well.
        </Paragraph>

        <Paragraph size="xlarge">
          Sign up now, or continue reading to see what Tello has to offer.
        </Paragraph>

        <SignupButtons />
      </LandingPageIntroWrapper>
    )
  }
}

const LandingPageIntroWrapper = styled(MaxWidthWrapper)`
  position: relative;
  padding: ${UNITS_IN_PX[5]};
`;

const Question = styled.h1`
  background: ${getHeadingBackground};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 48px;
  margin-bottom: ${UNITS_IN_PX[2]};
`;

const Glow = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 50%;
  filter: blur(100px);
  background: rgba(68,138,255,0.15);
`

export default LandingPageIntro;

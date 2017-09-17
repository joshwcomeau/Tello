import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNIT, UNITS_IN_PX } from '../../constants';

import StaticLayout from '../StaticLayout';
import Emoji from '../Emoji';
import Heading from '../Heading';
import Divider from '../Divider';
import Spacer from '../Spacer';
import Link from '../Link';
import Paragraph from '../Paragraph';


const AboutView = () => (
  <StaticLayout
    title="About Tello"
  >
    <Section>
      <Paragraph size="large">
        <Emoji>👋 </Emoji>Hi! I'm Josh. I built Tello.
      </Paragraph>

      <Paragraph size="large">
        Many nights, after work, my partner and I like to watch an hour or two of trashy reality TV. It's a great way to unwind after a long day.
      </Paragraph>

      <Paragraph size="large">
        I noticed that I was really bad at remembering things; I couldn't remember which episodes we had already seen. Worse, I'd totally forget about some great series once I had finished the current season; years later, maybe I'd remember to check for new seasons, but I'm sure I forgot about a ton of great shows.
      </Paragraph>

      <Paragraph size="large">
        I tried some of the existing options but found that they were bloated and overcomplicated. I wanted a quick way to check what shows were available for me to watch, and nothing I found did the trick.
      </Paragraph>

      <Paragraph size="large">
        As a software developer and semi-competent designer, I realized that this was a problem I could solve, and Tello was built! <Emoji>✨</Emoji>
      </Paragraph>

      <Paragraph size="large">
        This is very much a side-project. It was built mostly during a week-long vacation (as well as a few evenings/weekends). The scope is very narrow, because it had to be, but that also means it's very focused at doing 1 thing, and doing it well: letting you know what to watch right before you sit down in front of a TV.
      </Paragraph>

      <Paragraph size="large">
        The goal of Tello is not to become a business, or to make money. It's something I wanted to exist, and a good excuse to practice my design/dev skills. On the extremely unlikely chance that Tello becomes popular, I may need to do some monetization to cover its costs... Most likely I'd charge a small fee for membership to <em>new</em> members, but I'd like to keep it free for early adopters. But yeah, that's unlikely.
      </Paragraph>

      <Paragraph size="large">
        I hope you enjoy Tello! If it helps, please <Link to="/contact">reach out and let me know</Link>!
      </Paragraph>

      <Signed>Josh Comeau</Signed>

      <Spacer size={UNIT * 4} />

      <Paragraph size="small">
        PS, for Fellow devs: if it interests you, the source is
        {' '}
        <Link external href="https://github.com/joshwcomeau/Tello">
          available on GitHub
        </Link>
        .
      </Paragraph>
    </Section>
  </StaticLayout>
);


const Section = styled.div`
  margin: ${UNITS_IN_PX[3]} auto;
  max-width: 900px;
`;

const Signed = styled.div`
  text-align: right;
  font-size: 28px;
  color: ${COLORS.purple.primary};

  &:before {
    content: '- ';
  }
`;

export default AboutView;

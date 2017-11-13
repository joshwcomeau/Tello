import React from 'react';
import styled from 'react-emotion';

import { UNIT, UNITS_IN_PX } from '../../constants';

import StaticLayout from '../StaticLayout';
import Emoji from '../Emoji';
import Spacer from '../Spacer';
import Link from '../Link';
import Paragraph from '../Paragraph';

const AboutView = () => (
  <StaticLayout title="About Tello">
    <Section>
      <Paragraph size="large">
        <EmojiRotater>
          {/*
                ESLint doesn't like my Emoji wrapper :/
                I'm following the a11y rules, but it can't tell.
              */}
          {/* eslint-disable jsx-a11y/accessible-emoji */}
          <Emoji size={40}>👋</Emoji>.
          {/* eslint-enable jsx-a11y/accessible-emoji */}
        </EmojiRotater>{' '}
        Hi! I'm Josh. I built Tello.
      </Paragraph>

      <Paragraph size="large">
        Many nights, after work, my partner and I like to watch an hour or two
        of trashy reality TV. It's a great way to unwind after a long day.
      </Paragraph>

      <Paragraph size="large">
        Finding something to watch was tricky, though. Unless we binge-watch a
        series, it's hard to remember where we left off when we return to it.
        Worse, sometimes I'd totally forget that a great show even existed;
        months after a season ends, how do you remember to check to see if there
        are new episodes?
      </Paragraph>

      <Paragraph size="large">
        I tried some of the existing options but found that they were bloated
        overcomplicated. I wanted a quick, fun way to check what shows were
        available for me to watch, and nothing I found did the trick.
      </Paragraph>

      <Paragraph size="large">
        As a software developer and semi-competent designer, I realized that
        this was a problem I could solve, and Tello was built!{' '}
        {/*
                ESLint doesn't like my Emoji wrapper :/
                I'm following the a11y rules, but it can't tell.
              */}
        {/* eslint-disable jsx-a11y/accessible-emoji */}
        <Emoji>✨</Emoji>
        {/* eslint-enable jsx-a11y/accessible-emoji */}
      </Paragraph>

      <Paragraph size="large">
        This is very much a side-project. It was built mostly during a week-long
        vacation, and continues to be developed during evenings/weekends. As a
        result, the scope is very narrow. It only does 1 thing: helps you keep
        track of your favourite shows, so you can figure out really quickly what
        to watch, when you're sitting in front of a TV.
      </Paragraph>

      <Paragraph size="large">
        The goal of Tello is not to become a business, or to make money. It's
        something I wanted to exist, and a good excuse to practice my design/dev
        skills. If, by some miracle, it becomes popular, I may have to introduce
        some monetization, to cover its costs. Maybe I'd charge a small
        membership fee... but if I did, I'd keep it free for my early adopters
        (that's you!). Y'all would get grandfathered into a free plan. But yeah,
        that's unlikely.
      </Paragraph>

      <Paragraph size="large">
        I hope you enjoy Tello! If it helps, please{' '}
        <Link to="/contact">reach out and let me know</Link>!
      </Paragraph>

      <Signed>Josh Comeau</Signed>

      <Spacer size={UNIT * 4} />

      <Paragraph size="small">
        PS, for Fellow devs: if it interests you, the source is{' '}
        <Link external href="https://github.com/joshwcomeau/Tello">
          available on GitHub
        </Link>
        .
      </Paragraph>
    </Section>
  </StaticLayout>
);

const EmojiRotater = styled.span`
  display: inline-block;
  margin-left: -14px;
`;

const Section = styled.div`
  margin: ${UNITS_IN_PX[3]} auto;
  max-width: 800px;
`;

const Signed = styled.div`
  text-align: right;
  font-size: 32px;
  font-family: 'Raleway';
  font-weight: bold;

  &:before {
    content: '- ';
  }
`;

export default AboutView;

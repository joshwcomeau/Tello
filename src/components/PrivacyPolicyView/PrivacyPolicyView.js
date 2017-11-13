import React from 'react';
import styled from 'react-emotion';

import { UNITS_IN_PX } from '../../constants';

import StaticLayout from '../StaticLayout';
import Heading from '../Heading';
import Divider from '../Divider';
import Paragraph from '../Paragraph';

const PrivacyPolicy = () => (
  <StaticLayout title="Privacy Policy" subtitle="Last Updated: Sept 15th 2017 ">
    <Heading theme="vibrantAlt" size="small">
      TL:DR;
    </Heading>
    <Paragraph size="large">
      Tello is a 1-person side-project, and so the usual legalese about what
      happens to your data in the event of hostile takeover is not applicable. I
      collect very minimal personal data (name and email address), and rely on
      third-party services (Google) to handle authentication. I won't sell the
      information I do collect. I do use cookies and analytics tools.
    </Paragraph>

    <Divider />

    <Section>
      <Heading theme="vibrantAlt" size="small">
        Data Collected
      </Heading>
      <Paragraph>
        When you sign up for a Tello account, you're rooted to our OAuth
        provider, Google. In the future, I may add Twitter/Facebook support, but
        the data collected will be identical.
      </Paragraph>

      <Paragraph>
        When you authorize Tello within Google's authentication flow, they send
        me a bunch of profile data. I only persist the ID, name, and email
        address of the Google account. The rest of the data is ignored and
        garbage-collected by the server.
      </Paragraph>

      <Paragraph>
        When you add shows, or mark episodes as watched, I persist that data as
        well, and associate it with your account.
      </Paragraph>

      <Paragraph>The data is persisted in a cloud database provider.</Paragraph>
    </Section>

    <Section>
      <Heading theme="vibrantAlt" size="small">
        Data Usage
      </Heading>
      <Paragraph>
        Right now, the only thing your personal data is being used for is so
        that, in the "Settings" pane, you can tell which account you're logged
        into.
      </Paragraph>

      <Paragraph>
        In the future, I like the idea of using this data for personalization. I
        think it'd be neat if alerts would address you by-name.
      </Paragraph>

      <Paragraph>
        At some point I'd like to add notifications, in the form of email or
        Chrome push notifications. In this case your personal information may be
        used for those, although notifications will always be opt-in, so you
        won't suddenly start getting emails or push notifications.
      </Paragraph>

      <Paragraph>
        The show/episode data is used in the product for obvious reasons: to
        figure out which shows to display, and which episodes to show.
      </Paragraph>

      <Paragraph>
        I feel like this ought to go without saying, but there's no harm in
        being explicit. I won't ever sell your personal data to any third
        parties. Because I'm not a scumbag. I think I've seen other privacy
        policies that say they'll give your info to law enforcement if
        court-ordered? If the cops are that interested in your TV-viewing
        habits,
      </Paragraph>
    </Section>

    <Section>
      <Heading theme="vibrantAlt" size="small">
        Cookies
      </Heading>
      <Paragraph>
        I use cookies to persist an authentication token, so that when you
        return to Tello, you don't have to login again. I don't use cookies for
        any other reason, although Google Analytics adds a cookie as well, I
        believe so that it can identify return visitors. Which is a nice segue
        into...
      </Paragraph>
    </Section>

    <Section>
      <Heading theme="vibrantAlt" size="small">
        Tracking
      </Heading>
      <Paragraph>
        I dropped the standard Google Analytics snippet onto Trello, to help me
        understand how y'all are using the product. As stated above, it will add
        a small cookie (I believe this is so that it can distinguish repeat
        visitors). I do not submit any of the information I have about you to
        Google Analytics, although since signup only happens via Google account,
        this is somewhat of a moot point.
      </Paragraph>
    </Section>
  </StaticLayout>
);

const Section = styled.div`
  margin: ${UNITS_IN_PX[3]} auto;
  max-width: 700px;
`;

export default PrivacyPolicy;

import React, { PureComponent } from 'react';
import styled from 'emotion/react';

import { UNIT, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';
import Paragraph from '../Paragraph';
import SignupButtons from '../SignupButtons';
import Spacer from '../Spacer';
import MaxWidthWrapper from '../MaxWidthWrapper';


class LandingPageSignup extends PureComponent {
  render() {
    return (
      <LandingPageSignupElem>
        <MaxWidthWrapper maxWidth="800px">
          <Heading theme="light">
            Register and start tracking!
          </Heading>

          <Spacer size={UNIT * 2} />

          <Paragraph size="xlarge" align="center">
            Sign up and add a few of your favourite shows.
          </Paragraph>

          <Paragraph size="large" align="center">
            Tello is 100% free to use, and doesn't run ads.
            {' '}
            <a onClick={this.handleExpand}>Read more</a>.
          </Paragraph>

          <SignupButtons />
        </MaxWidthWrapper>
      </LandingPageSignupElem>
    );
  }
};

const LandingPageSignupElem = styled.div`
  position: relative;
  z-index: 2;
  padding: ${UNITS_IN_PX[8]} 0;
  text-align: center;
  background: rgba(41, 121, 255, 0.35);
`

export default LandingPageSignup;

import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { BREAKPOINTS, COLORS, UNIT, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';
import Paragraph from '../Paragraph';
import SignupButtons from '../SignupButtons';
import Spacer from '../Spacer';
import Link from '../Link';
import MaxWidthWrapper from '../MaxWidthWrapper';

class LandingPageSignup extends PureComponent {
  render() {
    return (
      <LandingPageSignupElem>
        <MaxWidthWrapper maxWidth="800px">
          <RegisterHeading>Register and start tracking!</RegisterHeading>

          <Spacer size={UNIT * 2} />

          <Paragraph size="xlarge" align="center">
            Sign up and add a few of your favourite shows.
          </Paragraph>

          <Paragraph size="large" align="center">
            Tello is 100% free to use, and doesn't run ads.{' '}
            <Link color={COLORS.cyan.light} to="/about">
              Read more
            </Link>.
          </Paragraph>

          <SignupButtons />
        </MaxWidthWrapper>
      </LandingPageSignupElem>
    );
  }
}

const RegisterHeading = styled(Heading)`
  font-size: 52px;
  color: ${COLORS.white};
  letter-spacing: -0.5px;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  line-height: 1.25;

  @media ${BREAKPOINTS.sm} {
    font-size: 36px;
  }
`;

const LandingPageSignupElem = styled.div`
  position: relative;
  z-index: 2;
  padding: ${UNITS_IN_PX[8]} 0;
  text-align: center;
  background: rgba(41, 121, 255, 0.35);
`;

export default LandingPageSignup;

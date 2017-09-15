import React from 'react';
import styled from 'emotion/react';

import { UNITS_IN_PX } from '../../constants';

import GoogleButton from '../GoogleButton';
import Link from '../Link';


const SignupButtons = () => {
  return (
    <SignupButtonsWrapper>
      <GoogleButton official>
        Sign up with Google
      </GoogleButton>
      <SmallText>
        Sorry, only Google signup is available. Want to use a different provider, like Facebook or Twitter? <Link strong white to="/contact">Email me</Link> and let me know!
      </SmallText>
    </SignupButtonsWrapper>
  );
};

const SignupButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SmallText = styled.p`
  max-width: 440px;
  margin-top: ${UNITS_IN_PX[2]};
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  line-height: 1.6;
  font-style: italic;
`;

export default SignupButtons;

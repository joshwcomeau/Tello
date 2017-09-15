import React from 'react';
import styled from 'emotion/react';

import { UNITS_IN_PX } from '../../constants';

import GoogleButton from '../GoogleButton';
import Link from '../Link';


const SignupButtons = () => {
  return (
    <SignupButtonsWrapper>
      <GoogleButton size="large" />
      <SmallText>
        Currently, only Google signup exists. Want to be able to sign up with Twitter or Facebook? <Link to="/contact">Email me</Link> and let me know!
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
  max-width: 350px;
  margin: ${UNITS_IN_PX[1]} auto;
  font-size: 12px;
`;

export default SignupButtons;

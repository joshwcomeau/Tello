import React from 'react';
import styled from 'react-emotion';

import { COLORS } from '../../constants';

import SignupButtons from '../SignupButtons';
import Heading from '../Heading';

const LoggedOutMenu = () => {
  return (
    <Wrapper>
      <Heading size="small">Log In / Sign Up</Heading>
      <br />
      <br />
      <SignupButtons linkColor={COLORS.blue.primary} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

export default LoggedOutMenu;

import React from 'react';
import styled from 'emotion/react';

import GoogleButton from '../GoogleButton';
import Heading from '../Heading';


const MobileLoggedOutMenu = () => {
  return (
    <Wrapper>
      <Heading size="small">Log In / Sign Up</Heading>
      <GoogleButton official />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`

export default MobileLoggedOutMenu;

import React from 'react';
import styled from 'react-emotion';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Paragraph from '../Paragraph';

const NotFoundView = () => {
  return (
    <NotFoundWrapper>
      <LargeHeading>404</LargeHeading>
      <Paragraph size="xlarge">Oh no! There's nothing here.</Paragraph>
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  padding: ${UNITS_IN_PX[2]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LargeHeading = styled.h1`
  font-size: 192px;
  font-weight: bold;
  letter-spacing: -3px;
  background: linear-gradient(
    -15deg,
    ${COLORS.blue.primary},
    ${COLORS.cyan.primary},
    ${COLORS.teal.primary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default NotFoundView;

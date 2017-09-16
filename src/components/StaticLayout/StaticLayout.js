// This is the layout used for side-pages, like the privacy policy.
import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Logo from '../Logo';
import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';


const StaticLayout = ({ title, subtitle, children }) => (
  <StaticLayoutElem>
    <MaxWidthWrapper>
      <StaticHeader>
        <Logo
          boxColor={COLORS.gray.veryLight}
          background={COLORS.gray.veryDark}
        />
      </StaticHeader>

      <Heading size="medium" theme="vibrant">
        {title}
      </Heading>

      {subtitle && <Subtitle>{subtitle}</Subtitle>}

      {children}
    </MaxWidthWrapper>

  </StaticLayoutElem>
);

const StaticLayoutElem = styled.div`
  min-height: 100vh;
`

const StaticHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${UNITS_IN_PX[5]} 0 ${UNITS_IN_PX[2]};
`

const Subtitle = styled.h4`
  font-size: 18px;
  color: ${COLORS.gray.light};
  font-weight: 400;
  margin-top: -${UNITS_IN_PX[1]};
  margin-bottom: ${UNITS_IN_PX[3]};
`;

export default StaticLayout;

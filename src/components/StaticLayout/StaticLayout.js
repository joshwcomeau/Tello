// This is the layout used for side-pages, like the privacy policy.
import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Logo from '../Logo';
import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';


const StaticLayout = ({ title, children }) => (
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

      {children}
    </MaxWidthWrapper>

  </StaticLayoutElem>
);

const StaticLayoutElem = styled.div`

`

const StaticHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${UNITS_IN_PX[5]} 0 ${UNITS_IN_PX[2]};
`

export default StaticLayout;

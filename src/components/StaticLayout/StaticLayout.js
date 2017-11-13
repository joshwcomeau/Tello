// This is the layout used for side-pages, like the privacy policy.
import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import {
  BREAKPOINTS,
  COLORS,
  UNIT,
  UNITS_IN_PX,
  FOOTER_HEIGHT_PX,
  MOBILE_FOOTER_HEIGHT_PX,
} from '../../constants';

import Logo from '../Logo';
import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';

class StaticLayout extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { title, subtitle, children } = this.props;

    return (
      <StaticLayoutElem>
        <MaxWidthWrapper>
          <StaticHeader>
            <Logo
              boxColor={COLORS.gray.veryLight}
              textColor={COLORS.gray.veryDark}
            />
          </StaticHeader>

          <Heading size="medium" theme="vibrant">
            {title}
          </Heading>

          {subtitle && <Subtitle>{subtitle}</Subtitle>}

          {children}

          <Spacer size={UNIT * 5} />
        </MaxWidthWrapper>
      </StaticLayoutElem>
    );
  }
}

const StaticLayoutElem = styled.div`
  min-height: calc(100vh - ${FOOTER_HEIGHT_PX});

  @media ${BREAKPOINTS.sm} {
    min-height: calc(100vh - ${MOBILE_FOOTER_HEIGHT_PX});
  }
`;

const StaticHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${UNITS_IN_PX[5]} 0 ${UNITS_IN_PX[2]};
`;

const Subtitle = styled.h4`
  font-size: 18px;
  color: ${COLORS.gray.light};
  font-weight: 400;
  margin-top: -${UNITS_IN_PX[1]};
  margin-bottom: ${UNITS_IN_PX[3]};
`;

export default StaticLayout;

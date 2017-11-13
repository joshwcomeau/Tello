import React from 'react';
import styled from 'react-emotion';

import {
  ROW_HEIGHT,
  UNITS_IN_PX,
  HEADER_HEIGHT_PX,
  Z_INDICES,
} from '../../constants';
import { isDesktop } from '../../helpers/responsive.helpers';

import DesktopNavigation from '../DesktopNavigation';
import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import LoggedInScrollbars from '../LoggedInScrollbars';
import Spinner from '../Spinner';
import NoShowsYet from '../NoShowsYet';
import FetchEpisodes from '../FetchEpisodes';

const LoggedInLayout = ({ showNavLinks, children, isFetching, noShowsYet }) => {
  let mainContent;

  if (isFetching) {
    mainContent = (
      <SpinnerWrapper>
        <Spinner size="lg" />
      </SpinnerWrapper>
    );
  } else if (noShowsYet) {
    mainContent = (
      <MaxWidthWrapper>
        <NoShowsYet />
      </MaxWidthWrapper>
    );
  } else {
    mainContent = children;
  }

  return [
    <Header key="header" />,

    <MaxWidthWrapper key="wrapper" noPaddingOnMobile>
      <Body>
        {// Add a spacer on desktop.
        // The mobile view adds its own spacer, so it's not needed there.
        // (Can't be consolidated because we want this space to be swipable,
        // so it HAS to be a child of the MobileView swipe container.)
        isDesktop() && <Spacer size={ROW_HEIGHT} />}

        {isDesktop() && showNavLinks && <DesktopNavigation />}

        {mainContent}
      </Body>
    </MaxWidthWrapper>,

    // Logged-in data component
    <FetchEpisodes key="fetch" />,

    // Style the scrollbars in webkit
    <LoggedInScrollbars key="scrollbars" />,
  ];
};

const Body = styled.div`
  position: relative;
  z-index: ${Z_INDICES.root};

  min-height: calc(100vh - ${HEADER_HEIGHT_PX});
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${UNITS_IN_PX[6]} 0;
`;

export default LoggedInLayout;

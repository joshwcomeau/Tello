import React, { PureComponent } from 'react';
import styled from 'emotion/react';
import ReactSwipe from 'react-swipe';

import {
  COLORS,
  ROW_HEIGHT_PX,
  HALF_UNIT_PX,
  UNITS_IN_PX
} from '../../constants';

import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SummaryView from '../SummaryView';
import Heading from '../Heading';


class MobileView extends PureComponent {
  render() {
    return (
      <ReactSwipe>
        <ViewWrapper>
          <MobileHeading>Backlog</MobileHeading>
          <BacklogView />
        </ViewWrapper>

        <ViewWrapper>
          <MobileHeading>Calendar</MobileHeading>
          <CalendarView />
        </ViewWrapper>

        <ViewWrapper>
          <MobileHeading>Summary</MobileHeading>
          <SummaryView />
        </ViewWrapper>
      </ReactSwipe>
    );
  }
}

const ViewWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: ${ROW_HEIGHT_PX} ${UNITS_IN_PX[1]};
`;

const MobileHeading = styled(Heading)`
  margin-bottom: ${UNITS_IN_PX[1]};
  color: COLORS.white;
`;

export default MobileView;

import React, { PureComponent } from 'react';
import styled from 'emotion/react';
import ReactSwipe from 'react-swipe';

import { ROW_HEIGHT_PX, HALF_UNIT_PX } from '../../constants';

import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SummaryView from '../SummaryView';


class MobileView extends PureComponent {
  render() {
    return (
      <ReactSwipe>
        <ViewWrapper>
          <BacklogView />
        </ViewWrapper>
        <ViewWrapper>
          <CalendarView />
        </ViewWrapper>
        <ViewWrapper>
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
  padding: ${ROW_HEIGHT_PX} ${HALF_UNIT_PX};
`;

export default MobileView;

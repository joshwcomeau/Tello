import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import ReactSwipe from 'react-swipe';

import { swipeMobileView } from '../../actions';
import { ROW_HEIGHT_PX, UNITS_IN_PX } from '../../constants';

import SummaryView from '../SummaryView';
import BacklogView from '../BacklogView';
import CalendarView from '../CalendarView';
import SettingsView from '../SettingsView';
import Heading from '../Heading';
import SwipeIndicator from '../SwipeIndicator';

class MobileView extends PureComponent {
  static propTypes = {
    activeViewIndex: PropTypes.number.isRequired,
  };

  render() {
    const { activeViewIndex, swipeMobileView } = this.props;

    const views = [
      { name: 'summary', View: SummaryView },
      { name: 'backlog', View: BacklogView },
      { name: 'calendar', View: CalendarView },
      { name: 'settings', View: SettingsView },
    ];

    return [
      <ReactSwipe key="views" swipeOptions={{ callback: swipeMobileView }}>
        {views.map(({ name, View }, index) => (
          <ViewWrapper key={name} isActive={index === activeViewIndex}>
            <MobileHeading>{name}</MobileHeading>
            <View />
          </ViewWrapper>
        ))}
      </ReactSwipe>,
      <SwipeIndicator key="swipe-indicator" />,
    ];
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
  height: ${props => (props.isActive ? 'auto' : '100vh')};
`;

const MobileHeading = styled(Heading)`
  margin-bottom: ${UNITS_IN_PX[1]};
  text-transform: capitalize;
  color: COLORS.white;
`;

const mapStateToProps = state => ({
  activeViewIndex: state.mobile.activeViewIndex,
});

export default connect(mapStateToProps, { swipeMobileView })(MobileView);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import { Motion, spring } from 'react-motion';
import addWeeks from 'date-fns/add_weeks';

import { COLORS, UNITS_IN_PX, ROW_HEIGHT_PX } from '../../constants';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';

import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import Calendar from '../Calendar';
import CalendarWeekPicker from '../CalendarWeekPicker';
import Hover from '../Hover';


const CALENDAR_3D_WIDTH = '15px';

class LandingPageCalendar extends PureComponent {
  state = {
    isHoveringCalendar: false,
  }

  updateHover = val => () => {
    this.setState({ isHoveringCalendar: val })
  }

  renderCalendarDemo() {
    const { isHoveringCalendar } = this.state;

    return (
      <Motion
        style={{
          rotation: spring(isHoveringCalendar ? 0 : -20),
          opacity: spring(isHoveringCalendar ? 1 : 0),
        }}
      >
        {({ rotation, opacity }) => (
          <CalendarDemo
            onMouseEnter={this.updateHover(true)}
            onMouseLeave={this.updateHover(false)}
          >
            <CalendarTransform
              style={{ transform: `
                perspective(500px)
                rotateY(${rotation}deg)
              `}}
            >
              <CalendarHeader>
                <CalendarWeekPicker maxDate={addWeeks(new Date(), 2)} />
              </CalendarHeader>

              <CalendarWrapper>
                <Calendar shows={this.props.shows} />
                <CalendarEdge
                  style={{ transform: `
                    perspective(500px)
                    rotateY(${rotation + 90}deg)
                  `}}
                />
                <Glow
                  style={{ opacity: 1 - (opacity * 0.5) }}
                />
              </CalendarWrapper>

              <Disclaimer style={{ opacity }}>
                <strong>Note:</strong> This is just a demo. These episode dates are wrong.
              </Disclaimer>
            </CalendarTransform>
          </CalendarDemo>
        )}
      </Motion>
    );
  }
  render() {
    return (
      <LandingPageCalendarElem>
        <MaxWidthWrapper>
          <DescriptionWrapper faded={this.state.isHoveringCalendar}>
            <Heading theme="vibrant">The Calendar</Heading>
            <Paragraph size="large">
              One of Tello's most powerful features is the Calendar view. See what you missed last week, or what's coming up this week. ✨
            </Paragraph>

            <Paragraph size="large">
              Each row represents a show, and shows are omitted when they don't have any
              episodes this week, so it's quick to use even with lots of tracked shows.
            </Paragraph>
          </DescriptionWrapper>

          {this.renderCalendarDemo()}
        </MaxWidthWrapper>
      </LandingPageCalendarElem>
    )
  }
}

const LandingPageCalendarElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  padding-bottom: ${UNITS_IN_PX[5]};
`;

const CalendarDemo = styled.div`
  position: absolute;
  top: -57px;
  right: ${UNITS_IN_PX[2]};
  width: 80%;
`;

const DescriptionWrapper = styled.div`
  position: relative;
  top: 0;
  right: 0;
  margin-right: 60%;
  opacity: ${props => props.faded ? 0.2 : 1};
  transition: opacity 700ms;
`;

const CalendarTransform = styled.div`
  transform-origin: right center;
  will-change: transform;
`;

const CalendarWrapper = styled.div`
  position: relative;
`

const CalendarEdge = styled.div`
  position: absolute;
  top: 0;
  right: -${CALENDAR_3D_WIDTH};
  bottom: 0;
  width: ${CALENDAR_3D_WIDTH};
  background: #999;
  transform-origin: left center;
  will-change: transform;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Disclaimer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -40px;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  text-align: center;
`;

const Glow = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 10px;
  width: 65%;
  border-radius: 100%;
  margin: auto;
  background: ${COLORS.pink.primary};
  filter: blur(50px);
  opacity: 0.75;
  z-index: -1;
`;





const mapStateToProps = state => ({
  shows: getTrackedShowsArray(state),
});

export default connect(mapStateToProps)(LandingPageCalendar);

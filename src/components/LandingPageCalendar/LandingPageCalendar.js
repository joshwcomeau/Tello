import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Motion, spring } from 'react-motion';
import addWeeks from 'date-fns/add_weeks';

import { BREAKPOINTS, COLORS, UNITS_IN_PX } from '../../constants';
import { isLargeScreen } from '../../helpers/responsive.helpers';
import { getTrackedShowsArray } from '../../reducers/tracked-shows.reducer';

import Emoji from '../Emoji';
import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import Calendar from '../Calendar';
import CalendarWeekPicker from '../CalendarWeekPicker';

const CALENDAR_3D_WIDTH = '15px';

class LandingPageCalendar extends PureComponent {
  state = {
    rotateCalendar: isLargeScreen(),
  };

  updateCalendarRotation = val => () => {
    if (isLargeScreen()) {
      this.setState({ rotateCalendar: val });
    }
  };

  renderCalendarDemo() {
    const { rotateCalendar } = this.state;

    return (
      <Motion
        style={{
          rotation: spring(rotateCalendar ? -20 : 0),
          opacity: spring(rotateCalendar ? 0 : 1),
        }}
      >
        {({ rotation, opacity }) => (
          <CalendarDemo>
            <CalendarTransform
              onMouseEnter={this.updateCalendarRotation(false)}
              onMouseLeave={this.updateCalendarRotation(true)}
              style={{
                transform: `
                  perspective(500px)
                  rotateY(${rotation}deg)
                `,
              }}
            >
              <CalendarHeader>
                <CalendarWeekPicker maxDate={addWeeks(new Date(), 2)} />
              </CalendarHeader>

              <CalendarWrapper>
                <Calendar demo={true} shows={this.props.shows} />
                <CalendarEdge
                  style={{
                    transform: `
                      perspective(500px)
                      rotateY(${rotation + 90}deg)
                    `,
                  }}
                />
                <Glow />
              </CalendarWrapper>

              <Disclaimer style={{ opacity }}>
                <strong>Note:</strong> This is just a demo, the data is fake.
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
          <DescriptionWrapper faded={!this.state.rotateCalendar}>
            <Heading theme="vibrant">The Calendar</Heading>
            <Paragraph align="left" size="large">
              One of Tello's most powerful features is the Calendar view. See
              what you missed last week, or what's coming up this week.{' '}
              {/*
                ESLint doesn't like my Emoji wrapper :/
                I'm following the a11y rules, but it can't tell.
              */}
              {/* eslint-disable jsx-a11y/accessible-emoji */}
              <Emoji name="sparkles">✨</Emoji>
              {/* eslint-enable jsx-a11y/accessible-emoji */}
            </Paragraph>

            <Paragraph align="left" size="large">
              Each row represents a show, and shows are omitted when they don't
              have any episodes this week, so it's quick to use even with lots
              of tracked shows.
            </Paragraph>
          </DescriptionWrapper>

          {this.renderCalendarDemo()}
        </MaxWidthWrapper>
      </LandingPageCalendarElem>
    );
  }
}

const LandingPageCalendarElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  padding-bottom: ${UNITS_IN_PX[5]};
`;

const CalendarDemo = styled.div`
  @media ${BREAKPOINTS.mdMin} {
    position: absolute;
    top: -57px;
    right: ${UNITS_IN_PX[2]};
    width: 90%;
  }

  @media ${BREAKPOINTS.xlMin} {
    width: 80%;
  }
`;

const DescriptionWrapper = styled.div`
  @media ${BREAKPOINTS.mdMin} {
    position: relative;
    top: 0;
    right: 0;
    margin-right: 65%;
    opacity: ${props => (props.faded ? 0.2 : 1)};
    transition: opacity 400ms;
  }

  @media ${BREAKPOINTS.xlMin} {
    margin-right: 60%;
  }
`;

const CalendarTransform = styled.div`
  transform-origin: right center;
  will-change: transform;
`;

const CalendarWrapper = styled.div`
  position: relative;
`;

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
  bottom: -35px;
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

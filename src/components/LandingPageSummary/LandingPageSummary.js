import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Motion, spring } from 'react-motion';

import { BREAKPOINTS, COLORS, UNITS_IN_PX } from '../../constants';
import { getAiredTrackedShowsArrayWithSeasons } from '../../reducers/tracked-shows.reducer';
import { ShowProps } from '../../types';

import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import SummaryShow from '../SummaryShow';

const SHOW_3D_WIDTH = '8px';

// NOTE: defining a custom breakpoint here, because the existing ones don't
// handle this edge-case well.
const SPECIAL_BREAKPOINT_WIDTH = 700;

class LandingPageSummary extends PureComponent {
  static propTypes = {
    shows: PropTypes.arrayOf(ShowProps),
  };

  state = {
    rotateCard: window.innerWidth > SPECIAL_BREAKPOINT_WIDTH,
  };

  updateCardRotation = newValue => () => {
    if (window.innerWidth > SPECIAL_BREAKPOINT_WIDTH) {
      this.setState({ rotateCard: newValue });
    }
  };

  renderSummaryDemo() {
    const { shows } = this.props;

    // For the first render, our show won't yet be in state.
    if (shows.length === 0) {
      return null;
    }

    // We only want to show Stranger Things for the demo.
    const show = shows.find(show => show.name === 'Stranger Things');

    return (
      <Motion
        style={{
          rotation: spring(this.state.rotateCard ? -20 : 0),
          placeholderOpacity: spring(this.state.rotateCard ? 1 : 0),
        }}
      >
        {({ rotation, placeholderOpacity }) => (
          <ShowDemo
            style={{
              transform: `perspective(600px) rotateY(${rotation}deg)`,
            }}
          >
            <ShowPlaceholder left style={{ opacity: placeholderOpacity }} />

            <ShowWrapper
              onMouseEnter={this.updateCardRotation(false)}
              onMouseLeave={this.updateCardRotation(true)}
            >
              <SummaryShow demo show={show} />
              <ShowEdge
                style={{
                  transform: `
                  perspective(600px)
                  rotateY(${rotation + 90}deg)
                `,
                }}
              />
            </ShowWrapper>

            <ShowPlaceholder right style={{ opacity: placeholderOpacity }} />
            <Glow />
          </ShowDemo>
        )}
      </Motion>
    );
  }

  render() {
    return (
      <LandingPageSummaryElem>
        <MaxWidthWrapper>
          <Row>
            <Col colWidth={2}>
              <Heading theme="vibrant">Bird's Eye View</Heading>
              <Paragraph size="large">
                Your home screen in Tello is an overview of the shows you're
                tracking. An at-a-glance summary of how many episodes are left
                for your favourite shows.
              </Paragraph>

              <Paragraph size="large">
                Each square at the bottom of the cards represent an episode, and
                its colour indicates whether or not it's been viewed.
              </Paragraph>
            </Col>

            <Col colWidth={1}>{this.renderSummaryDemo()}</Col>
          </Row>
        </MaxWidthWrapper>
      </LandingPageSummaryElem>
    );
  }
}

const LandingPageSummaryElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  padding-bottom: ${UNITS_IN_PX[5]};
  /* Hide the Glow from overlapping the Hero */
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;

  @media (max-width: ${SPECIAL_BREAKPOINT_WIDTH}px) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  position: relative;
  z-index: 1;
  flex: ${props => props.colWidth};

  &:first-of-type {
    @media (max-width: ${SPECIAL_BREAKPOINT_WIDTH}px) {
      margin-bottom: ${UNITS_IN_PX[3]};
    }

    @media (min-width: ${SPECIAL_BREAKPOINT_WIDTH + 1}px) {
      z-index: 2;
      margin-right: ${UNITS_IN_PX[8]};
    }

    @media ${BREAKPOINTS.lg} {
      z-index: 2;
      margin-right: ${UNITS_IN_PX[3]};
    }
  }
`;

const ShowDemo = styled.div`
  position: relative;
  max-width: 400px;
  margin: auto;
`;

const ShowWrapper = styled.div`
  position: relative;
`;

const ShowEdge = styled.div`
  position: absolute;
  top: 0;
  right: -${SHOW_3D_WIDTH};
  bottom: 0;
  width: ${SHOW_3D_WIDTH};
  background: rgba(255, 255, 255, 0.6);
  transform-origin: left center;
  will-change: transform;
`;

const ShowPlaceholder = styled.div`
  position: absolute;
  top: 2px;
  left: 0;
  right: 0;
  bottom: -2px;
  background: rgba(255, 255, 255, 0.1);
  transform: ${props =>
    props.left ? 'translateX(-106%)' : 'translateX(106%)'};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props =>
      props.left
        ? 'linear-gradient(to left, rgba(31, 29, 29, 0), rgba(31, 29, 29, 1) 70%)'
        : 'linear-gradient(to right, rgba(31, 29, 29, 0), rgba(31, 29, 29, 1) 70%)'};
  }
`;

const Glow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.pink.primary};
  filter: blur(50px);
  opacity: 0.35;
  z-index: -1;
`;

const mapStateToProps = state => ({
  shows: getAiredTrackedShowsArrayWithSeasons(state),
});

export default connect(mapStateToProps)(LandingPageSummary);

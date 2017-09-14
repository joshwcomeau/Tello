import React, { PureComponent } from 'react';
import styled from 'emotion/react';
import { Motion, spring } from 'react-motion';
import ArrowForward from 'react-icons/lib/md/arrow-forward';

import { COLORS, UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import LandingPageSummaryManager from '../LandingPageSummaryManager';

import { SHOWS } from './LandingPageSummary.data.js'


class LandingPageSummary extends PureComponent {
  state = {
    isHoveringCard: false,
  }

  updateHover = (newValue) => () => {
    this.setState({ isHoveringCard: newValue })
  }

  render() {
    return (
      <LandingPageSummaryElem>
        <MaxWidthWrapper>
          <Row>
            <Col colWidth={2}>
              <Heading theme="vibrant">Summary View</Heading>
              <Paragraph size="large">
                Your home screen in Tello is an overview of the shows you're tracking. An at-a-glance summary of how many episodes are left for your favourite shows.
              </Paragraph>

              <Paragraph size="large">
                Each square at the bottom of the cards represent an episode, and its colour indicates whether or not it's been viewed.
              </Paragraph>

              <Paragraph size="large">
                Toggle an episode by clicking on the square <Pointer />.
              </Paragraph>
            </Col>

            <Col colWidth={1}>
              <Motion
                style={{
                  rotation: spring(this.state.isHoveringCard ? 0 : -20),
                  placeholderOpacity: spring(this.state.isHoveringCard ? 0 : 1),
                }}
              >
                {({ rotation, placeholderOpacity }) => (
                  <ShowWrapper
                    style={{
                      transform: `perspective(600px) rotateY(${rotation}deg)`,
                    }}
                  >
                    <ShowPlaceholder
                      left
                      style={{ opacity: placeholderOpacity }}
                    />

                    <LandingPageSummaryManager
                      handleMouseEnter={this.updateHover(true)}
                      handleMouseLeave={this.updateHover(false)}
                      show={SHOWS.strangerThings}
                    />

                    <ShowPlaceholder
                      right
                      style={{ opacity: placeholderOpacity }}
                    />
                    <Glow />
                  </ShowWrapper>
                )}
              </Motion>
            </Col>
          </Row>
        </MaxWidthWrapper>
      </LandingPageSummaryElem>
    );
  }
}

const LandingPageSummaryElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  background: ${COLORS.gray.veryDark};
  min-height: 100vh;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  position: relative;
  z-index: 1;
  flex: ${props => props.colWidth};

  &:first-of-type {
    z-index: 2;
    margin-right: ${UNITS_IN_PX[8]};
  }
`;

const ShowWrapper = styled.div`
  position: relative;
`;

const ShowPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255,255, 0.1);
  transform: ${props => props.left ? 'translateX(-106%)' : 'translateX(106%)'};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.left
      ? 'linear-gradient(to left, rgba(31, 29, 29, 0), rgba(31, 29, 29, 1) 70%)'
      : 'linear-gradient(to right, rgba(31, 29, 29, 0), rgba(31, 29, 29, 1) 70%)'
    }
  }
`

const Glow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.pink.primary};
  filter: blur(50px);
  opacity: 0.75;
  z-index: -1;
`;

const Pointer = styled(ArrowForward)`
  transform: rotate(-45deg);
`;

export default LandingPageSummary;

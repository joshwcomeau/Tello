import React, { PureComponent } from 'react';
import styled from 'emotion/react';

import { random } from '../../utils';

import Drift from '../Drift';
import Particle from '../Particle';

const QUADRANT_SIZE = 300;

class LandingPageParticles extends PureComponent {
  generateParticlesForQuadrants() {
    // Our landing page might be lots of different sizes, and we want to ensure
    // a consistent yet random-seeming distribution of particles.
    // Let's divide the page into fixed-pixel quadrants, and put 1 particle per
    // box. In this way, we ensure mobile responsiveness.
    let xQuadrantStart = 0;
    let yQuadrantStart = 0;

    let particles = [];

    while (xQuadrantStart < window.innerWidth) {
      yQuadrantStart = 0;
      while (yQuadrantStart < window.innerHeight) {
        // Some of our particles will move around onscreen, but most won't.
        // This is to reduce the number of simultaneous transforms.
        const isFrozen = false;

        particles.push(
          <Drift
            key={`${xQuadrantStart}-${yQuadrantStart}`}
            isFrozen={isFrozen}
            initialX={random(xQuadrantStart, xQuadrantStart + QUADRANT_SIZE)}
            initialY={random(yQuadrantStart, yQuadrantStart + QUADRANT_SIZE)}
          >
            <Particle />
          </Drift>
        );

        yQuadrantStart += QUADRANT_SIZE;
      }

      xQuadrantStart += QUADRANT_SIZE;
    }

    return particles;
  }

  render() {
    return (
      <ParticlesWrapper>
        {this.generateParticlesForQuadrants()}
      </ParticlesWrapper>
    );
  }
}

const ParticlesWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*
    Hiding overflow since we have particles flying around, and we want to
    ignore them once they go off-screen.
  */
  overflow: hidden;
`;


export default LandingPageParticles;

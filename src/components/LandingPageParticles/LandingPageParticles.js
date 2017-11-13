import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { random } from '../../utils';

import Drift from '../Drift';
import Particle from '../Particle';

const QUADRANT_SIZE = 300;
const STAGGER_LENGTH = 150;
const INITIAL_STAGGER_DELAY = 350;
const SHAPES = ['zigzag', 'square', 'triangle', 'pyramid'];

class LandingPageParticles extends PureComponent {
  generateParticlesForQuadrants() {
    // Our landing page might be lots of different sizes, and we want to ensure
    // a consistent yet random-seeming distribution of particles.
    // Let's divide the page into fixed-pixel quadrants, and put 1 particle per
    // box. In this way, we ensure mobile responsiveness.
    let xQuadrantStart = 0;
    let yQuadrantStart = 0;

    let index = 0;

    let particles = [];

    while (yQuadrantStart < window.innerHeight) {
      xQuadrantStart = 0;
      while (xQuadrantStart < window.innerWidth) {
        // Some of our particles will move around onscreen, but most won't.
        // This is to reduce the number of simultaneous transforms.
        const isFrozen = false;

        particles.push(
          <Drift
            key={`${xQuadrantStart}-${yQuadrantStart}`}
            isFrozen={isFrozen}
            initialX={random(xQuadrantStart, xQuadrantStart + QUADRANT_SIZE)}
            initialY={random(yQuadrantStart, yQuadrantStart + QUADRANT_SIZE)}
            initialRotation={random(-40, 40)}
          >
            <Particle
              shape={SHAPES[index % 4]}
              drawDelay={index * STAGGER_LENGTH + INITIAL_STAGGER_DELAY}
            />
          </Drift>
        );

        index += 1;

        xQuadrantStart += QUADRANT_SIZE;
      }

      yQuadrantStart += QUADRANT_SIZE;
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
    We want the particles to float in front of some elements, but they shouldn't
    interfere with clickability.
  */
  pointer-events: none;
  /*
    Hiding overflow since we have particles flying around, and we want to
    ignore them once they go off-screen.
  */
  overflow: hidden;
`;

export default LandingPageParticles;

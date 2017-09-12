import React from 'react';
import styled from 'emotion/react';

import {
  BREAKPOINTS,
  COLORS,
  UNIT,
  UNITS_IN_PX,
  ROW_HEIGHT,
} from '../../constants';


const Footer = () => {
  return (
    <FooterElem>
      <Copyright>
        Tello built by
        {' '}
        <FooterLink href="https://github.com/joshwcomeau/Tello">
          Joshua Comeau
        </FooterLink>.
        {' '}
        All rights reserved.
      </Copyright>

      <Acknowledgements>
        Data comes from
        {' '}
        <FooterLink href="https://www.tvmaze.com/">
          TV Maze
        </FooterLink>.
        {' '}
        This wouldn't be possible without their great API.
      </Acknowledgements>
    </FooterElem>
  );
};

const FooterElem = styled.footer`
  margin-top: ${UNITS_IN_PX[4]};
  padding: ${UNITS_IN_PX[2]};
  background: ${COLORS.purple.dark};
  color: ${COLORS.white};

  @media ${BREAKPOINTS.sm} {
    text-align: left;
    padding: ${UNITS_IN_PX[1]};
    /* Add space for the floating add-show button on mobile */
    padding-right: ${ROW_HEIGHT + UNIT * 2 + 'px'};
  }
`;

const Copyright = styled.div`
  font-size: 17px;
  margin-bottom: ${UNITS_IN_PX[1]};
`;

const Acknowledgements = styled.div`
  font-size: 14px;
`;

const FooterLink = styled.a`
  color: ${COLORS.white};
  text-decoration: none;
  font-family: 'Raleway';
  font-weight: bold;
`

export default Footer;

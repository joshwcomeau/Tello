import React from 'react';
import styled from 'emotion/react';

import {
  BREAKPOINTS,
  COLORS,
  UNIT,
  UNITS_IN_PX,
  HALF_UNIT_PX,
  ROW_HEIGHT,
  Z_INDICES,
} from '../../constants';

import Emoji from '../Emoji';
import Link from '../Link';
import Logo from '../Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';


const footerNavigationLinks = [
  { to: '/privacy', children: 'Privacy Policy' },
  { to: '/terms', children: 'Terms of Use' },
  { to: '/contact', children: 'Contact' },
];

const Footer = () => {
  return (
    <FooterElem>
      <MaxWidthWrapper>
        <FlexParent>
          <Left>
            <LogoWrapper>
              <Logo
                boxColor={COLORS.gray.dark}
                background={COLORS.white}
              />
            </LogoWrapper>
            <FooterLinks>
              {footerNavigationLinks.map((link, index) => [
                <Link key="link" color={COLORS.gray.primary} {...link} />,
                index !== footerNavigationLinks.length - 1 && (
                  <LinkDot key="dot" />
                )
              ])}
            </FooterLinks>
          </Left>
          <Right>
            <Credit>
              A <VibrantLink1 strong color={COLORS.deepPurple.primary} to="/about">
                side project
              </VibrantLink1>
              {' '}
              by
              {' '}
              <VibrantLink2
                external
                strong
                color={COLORS.purple.dark}
                href="https://twitter.com/joshwcomeau"
              >
                Josh Comeau
              </VibrantLink2>.
            </Credit>
            <Copyright>
              © 2017-present. All rights reserved.
            </Copyright>
            <Acknowledgements>
              Thanks to
              {' '}
              <Link
                external
                strong
                color={COLORS.gray.dark}
                href="https://www.tvmaze.com/"
              >
                TV Maze
              </Link>
              {' '}
              for their amazing API
              {' '}
              <Emoji name="heart" size={18}>💖</Emoji>.
            </Acknowledgements>
          </Right>
        </FlexParent>
      </MaxWidthWrapper>
    </FooterElem>
  );
};

const FooterElem = styled.footer`
  position: relative;
  z-index: ${Z_INDICES.root + 1};
  padding: ${UNITS_IN_PX[2]};
  background: ${COLORS.gray.veryLight};
  color: ${COLORS.gray.veryDark};

  @media ${BREAKPOINTS.sm} {
    text-align: left;
    padding: ${UNITS_IN_PX[1]};
    /* Add space for the floating add-show button on mobile */
    padding-right: ${ROW_HEIGHT + UNIT * 2 + 'px'};
  }
`;

const FlexParent = styled.div`
  display: flex;
  justify-content: space-between;
`
const Left = styled.div`

`;

const Right = styled.div`
  text-align: right;
`;

const LogoWrapper = styled.div`
  transform: scale(0.8);
  transform-origin: left top;
`

const FooterLinks = styled.div`
  font-size: 13px;
  line-height: ${UNITS_IN_PX[1]};
`;

const LinkDot = styled.span`
  display: inline-block;
  margin: 0 ${HALF_UNIT_PX};

  &:after {
    content: '•';
    color: ${COLORS.gray.primary}
  }
`;

const Credit = styled.div`
  font-size: 20px;
  font-family: 'Raleway';
  line-height: ${UNITS_IN_PX[1]};
  margin-bottom: ${HALF_UNIT_PX};
`;

const VibrantLink1 = styled(Link)`
  background: linear-gradient(
    to top,
    ${COLORS.deepPurple.primary},
    ${COLORS.blue.light}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const VibrantLink2 = styled(Link)`
  background: linear-gradient(
    to top,
    ${COLORS.purple.dark},
    ${COLORS.pink.primary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


const Copyright = styled.div`
  font-size: 15px;
  line-height: ${UNITS_IN_PX[1]};

  margin-bottom: ${UNIT * 2.5 + 'px'};
`;

const Acknowledgements = styled.div`
  font-size: 13px;
  line-height: ${UNITS_IN_PX[1]};
  color: ${COLORS.gray.primary};
`;

export default Footer;

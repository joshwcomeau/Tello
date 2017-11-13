import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { showAddShowModal } from '../../actions';
import {
  BREAKPOINTS,
  COLORS,
  UNITS_IN_PX,
  HEADER_HEIGHT_PX,
} from '../../constants';
import { getIsLoggedIn, getUser } from '../../reducers/auth.reducer';

import AddShowButton from '../AddShowButton';
import Logo from '../Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';

const Header = ({ isLoggedIn, user, showAddShowModal }) => (
  <HeaderElem>
    <MaxWidthWrapper style={{ height: '100%' }}>
      <LogoWrapper>
        <Logo
          boxColor={COLORS.gray.veryDark}
          /*
            NOTE: hardcoding these colours, so that it mimics the gradient it sits
            in front of. Because the text isn't 100% of the height, we can't simply
            use the color vars. TODO: Use some sort of color lib to determine this,
            based on a % mix between the two colors
          */
          textColor="linear-gradient(#e90091, #da00e0)"
          betaBoxColor={COLORS.pink.light}
          betaTextColor={COLORS.white}
        />
      </LogoWrapper>

      {isLoggedIn && (
        <AddShowButtonWrapper>
          <AddShowButton
            color={COLORS.deepPurple.primary}
            hoverColor={COLORS.blue.dark}
            onClick={showAddShowModal}
          />
        </AddShowButtonWrapper>
      )}
    </MaxWidthWrapper>
  </HeaderElem>
);

const HeaderElem = styled.header`
  position: relative;
  z-index: 5;
  height: ${HEADER_HEIGHT_PX};
  background: linear-gradient(${COLORS.pink.primary}, ${COLORS.purple.primary});
`;

const LogoWrapper = styled.div`
  position: absolute;
  height: ${UNITS_IN_PX[5]};
  left: ${UNITS_IN_PX[2]};
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;

  @media ${BREAKPOINTS.sm} {
    left: 0;
    right: 0;
    text-align: center;
  }
`;

const AddShowButtonWrapper = styled.div`
  position: absolute;
  right: ${UNITS_IN_PX[2]};
  bottom: 0;
  transform: translateY(50%);

  @media ${BREAKPOINTS.sm} {
    position: fixed;
    right: ${UNITS_IN_PX[1]};
    bottom: ${UNITS_IN_PX[1]};
    transform: translateY(0);
  }
`;

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  user: getUser(state),
});

export default connect(mapStateToProps, { showAddShowModal })(Header);

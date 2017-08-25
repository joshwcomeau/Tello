import React from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';

import AddShowButton from '../AddShowButton';
import Logo from '../Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';


const Header = () => {
  return (
    <HeaderElem>
      <MaxWidthWrapper style={{ height: '100%' }}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <AddShowButtonWrapper>
          <AddShowButton />
        </AddShowButtonWrapper>
      </MaxWidthWrapper>
    </HeaderElem>
  );
};

const HeaderElem = styled.header`
  position: relative;
  z-index: 5;
  height: ${UNITS_IN_PX[10]};
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
`;

const AddShowButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(50%);
`;

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Header);

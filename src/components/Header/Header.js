import React from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { showAddShowModal } from '../../actions';
import { COLORS, UNITS_IN_PX } from '../../constants';
import { getIsLoggedIn } from '../../reducers/auth.reducer';

import AddShowButton from '../AddShowButton';
import Logo from '../Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';


const Header = ({ isLoggedIn, showAddShowModal }) => {
  return (
    <HeaderElem>
      <MaxWidthWrapper style={{ height: '100%' }}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        {isLoggedIn && (
          <AddShowButtonWrapper>
            <AddShowButton
              color={COLORS.purple.dark}
              hoverColor={COLORS.deepPurple.primary}
              onClick={showAddShowModal}
            />
          </AddShowButtonWrapper>
        )}
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
  right: ${UNITS_IN_PX[2]};
  bottom: 0;
  transform: translateY(50%);
`;

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps, { showAddShowModal })(Header);

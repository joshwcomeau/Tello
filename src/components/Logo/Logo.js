import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { COLORS, ROW_HEIGHT_PX, UNITS_IN_PX } from '../../constants';

const propTypes = {
  boxColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  betaBoxColor: PropTypes.string.isRequired,
  betaTextColor: PropTypes.string.isRequired,
};

const defaultProps = {
  boxColor: COLORS.gray.veryDark,
  /*
    NOTE: hardcoding these colours, so that it mimics the gradient it sits
    in front of. Because the text isn't 100% of the height, we can't simply
    use the color vars. TODO: Use some sort of color lib to determine this,
    based on a % mix between the two colors
  */
  textColor: 'linear-gradient(#e90091, #da00e0)',

  betaBoxColor: COLORS.pink.light,
  betaTextColor: COLORS.white,
};

const Logo = ({ boxColor, textColor, betaBoxColor, betaTextColor }) => {
  return (
    <LogoContainer background={boxColor} href="/">
      <LogoElem color={textColor}>Tello</LogoElem>

      <Beta background={betaBoxColor} color={betaTextColor}>
        Beta
      </Beta>
    </LogoContainer>
  );
};

const LogoContainer = styled.a`
  position: relative;
  display: inline-block;
  background: ${props => props.background};
  text-decoration: none;
`;

const LogoElem = styled.h1`
  font-size: 64px;
  font-weight: bold;
  height: ${ROW_HEIGHT_PX};
  line-height: ${ROW_HEIGHT_PX};
  width: ${UNITS_IN_PX[15]};
  text-align: center;
  letter-spacing: -1px;
  font-family: 'Raleway';
  background: ${props => props.color};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Beta = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 38px;
  height: 18px;
  line-height: 19px;
  padding-left: 1px;
  text-align: center;
  background: ${props => props.background};
  color: ${props => props.color};
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Raleway';
`;

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;

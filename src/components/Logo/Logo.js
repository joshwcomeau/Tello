import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import { ROW_HEIGHT_PX, UNITS_IN_PX, COLORS } from '../../constants';


const propTypes = {
  background: PropTypes.string.isRequired,
};

const defaultProps = {
  boxColor: COLORS.gray.veryDark,
  /*
    NOTE: hardcoding these colours, so that it mimics the gradient it sits
    in front of. Because the text isn't 100% of the height, we can't simply
    use the color vars. TODO: Use some sort of color lib to determine this,
    based on a % mix between the two colors
  */
  background: 'linear-gradient(#e90091, #da00e0)',
};

const Logo = ({ boxColor, background }) => {
  return (
    <LogoContainer background={boxColor} href="/">
      <LogoElem background={background}>
        Tello
      </LogoElem>
    </LogoContainer>
  );
};

const LogoContainer = styled.a`
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
  background: ${props => props.background};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;

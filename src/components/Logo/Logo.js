import React from 'react';
import styled from 'emotion/react';

import { colors } from '../../constants';

const defaultProps = {
  size: 44,
};

console.log({colors})

const LogoElem = styled.h1`
  font-size: ${(props) => props.size + 'px'};
  font-weight: bold;
  font-family: 'Montserrat';
  background: -webkit-linear-gradient(
    ${colors.pink.primary},
    ${colors.purple.dark}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`;

const Logo = ({ size }) => {
  return <LogoElem size={size}>Teviso</LogoElem>;
};

Logo.defaultProps = defaultProps;

export default Logo;

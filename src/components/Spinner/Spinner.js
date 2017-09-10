import React from 'react';
import { css } from 'emotion';
import styled from 'emotion/react';

import { COLORS } from '../../constants';


const sizes = {
  sm: '32px',
  md: '64px',
  lg: '128px',
};

const borderWidths = {
  sm: '2px',
  md: '3px',
  lg: '4px',
}

const Spinner = ({ size }) => {
  return (
    <SpinnerWrapper size={size}>
      <Ring1 />
      <Ring2 />
      <Ring3 />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  position: relative;
  width: ${props => sizes[props.size]};
  height: ${props => sizes[props.size]};

  & > div {
    border-width: ${props => borderWidths[props.size]}
  }
`;

const ringStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 100%;
  border-style: solid;
`;

const Ring1 = styled.div`
  ${ringStyles};
  width: 100%;
  height: 100%;
  border-color: ${COLORS.blue.primary};
`;

const Ring2 = styled.div`
  ${ringStyles};
  width: 84.375%;
  height: 84.375%;
  border-color: ${COLORS.purple.primary};
`;

const Ring3 = styled.div`
  ${ringStyles};
  width: 68.75%;
  height: 68.75%;
  border-color: ${COLORS.pink.primary};
`;


export default Spinner;

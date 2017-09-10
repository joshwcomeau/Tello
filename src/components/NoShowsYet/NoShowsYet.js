import React from 'react';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX, ROW_HEIGHT_PX } from '../../constants';

import Heading from '../Heading';


const NoShowsYet = () => {
  return (
    <Wrapper>
      <Heading theme="vibrant">
        No shows yet.
      </Heading>
      <Paragraph>
        Use the <MiniAddShowButton>+</MiniAddShowButton> icon to add your first show!
      </Paragraph>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${ROW_HEIGHT_PX};
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 22px;
`

const MiniAddShowButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  transform: translateY(1px);
  line-height: 29px;
  font-size: 26px;
  background: ${COLORS.deepPurple.primary};
  font-family: 'Raleway';
  cursor: default;
`

export default NoShowsYet;

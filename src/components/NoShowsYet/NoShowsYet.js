import React from 'react';
import styled from 'emotion/react';

import { COLORS, HEADER_HEIGHT_PX } from '../../constants';

import NotificationView from '../NotificationView';


const NoShowsYet = () => (
  <NoShowsYetElem>
    <NotificationView heading="No shows yet.">
      Use the <MiniAddShowButton>+</MiniAddShowButton> icon to add your first show!
    </NotificationView>
  </NoShowsYetElem>
);

const NoShowsYetElem = styled.span`
  height: calc(100% - ${HEADER_HEIGHT_PX});
`;

const MiniAddShowButton = styled.span`
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

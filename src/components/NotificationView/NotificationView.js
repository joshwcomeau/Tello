import React from 'react';
import styled from 'emotion/react';

import { ROW_HEIGHT_PX } from '../../constants';

import Heading from '../Heading';

const NotificationView = ({ heading, children }) => (
  <Wrapper>
    <Heading theme="vibrant">
      {heading}
    </Heading>

    <Paragraph>
      {children}
    </Paragraph>
  </Wrapper>
);

const Wrapper = styled.div`
  padding-top: ${ROW_HEIGHT_PX};
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 22px;
`;


export default NotificationView;

import React from 'react';
import styled from 'react-emotion';

import { ROW_HEIGHT_PX } from '../../constants';

import Heading from '../Heading';
import Paragraph from '../Paragraph';

const NotificationView = ({ heading, children }) => (
  <Wrapper>
    <Heading theme="vibrant">{heading}</Heading>

    <Paragraph align="center" size="large">
      {children}
    </Paragraph>
  </Wrapper>
);

const Wrapper = styled.div`
  padding-top: ${ROW_HEIGHT_PX};
  text-align: center;
`;

export default NotificationView;

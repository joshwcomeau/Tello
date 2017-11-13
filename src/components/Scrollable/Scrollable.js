import React from 'react';
import styled from 'react-emotion';

const Scrollable = ({ children, maxHeight }) => (
  <ScrollableParent maxHeight={maxHeight}>
    <ScrollableWrap maxHeight={maxHeight}>
      <ScrollableChild>{children}</ScrollableChild>
    </ScrollableWrap>
  </ScrollableParent>
);

const ScrollableParent = styled.div`
  height: 100%;
  max-height: ${props => props.maxHeight};
  overflow: hidden;
`;

const ScrollableWrap = styled.div`
  height: 100%;
  max-height: ${props => props.maxHeight};
  margin-right: -30px;
  padding-right: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ScrollableChild = styled.div`
  margin-right: -8px;
`;

export default Scrollable;

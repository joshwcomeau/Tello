import React from 'react';
import styled from 'emotion/react';


const Scrollable = ({ children }) => (
  <ScrollableParent>
    <ScrollableWrap>
      <ScrollableChild>
        {children}
      </ScrollableChild>
    </ScrollableWrap>
  </ScrollableParent>
);

const ScrollableParent = styled.div`
  height: 100%;
  overflow: hidden;
`;

const ScrollableWrap = styled.div`
  height: 100%;
  margin-right: -30px;
  padding-right: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ScrollableChild = styled.div`
  margin-right: -15px;
`;

export default Scrollable;

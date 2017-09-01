import React from 'react';
import styled from 'emotion/react';


const Clearfix = styled.div`
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

export default Clearfix;

import styled from 'react-emotion';

const Clearfix = styled.div`
  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

export default Clearfix;

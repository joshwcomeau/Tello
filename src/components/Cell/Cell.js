import styled from 'emotion/react';

const Cell = styled.div`
  grid-column-start: ${props => props.col};
  grid-column-end: ${props => props.col + 1};
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row + 1};
  overflow: hidden;
`;

export default Cell;

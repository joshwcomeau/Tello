import styled from 'emotion/react';

import { COLORS } from '../../constants';

import Cell from '../Cell';


const CalendarStripedCell = styled(Cell)`
  border-bottom: 3px solid ${COLORS.gray.primary};
  border-right: 1px solid ${COLORS.gray.primary};
  background: ${COLORS.highlight.dark};
`

export default CalendarStripedCell;

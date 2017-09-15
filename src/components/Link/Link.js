import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'emotion/react';

import { COLORS } from '../../constants';

export default styled(Link)`
  text-decoration: none;
  color: ${COLORS.blue.light};
`;

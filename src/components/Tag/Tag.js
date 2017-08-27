import React from 'react';
import styled from 'emotion/react';

import { COLORS } from '../../constants';
import getDomainColor from '../../helpers/domain-colors.helpers';


const Tag = ({ domain }) => (
  <TagElem backgroundColor={getDomainColor(domain).baseColor}>
    {domain}
  </TagElem>
)
const TagElem = styled.span`
  display: inline-block;
  font-size: 10px;
  color: ${COLORS.white};
  background: ${props => props.backgroundColor};
  padding: 4px 6px;
`;

export default Tag;

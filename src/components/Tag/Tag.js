import React from 'react';
import styled from 'react-emotion';

import { COLORS } from '../../constants';
import getDomainColor from '../../helpers/domain-colors.helpers';

const Tag = ({ domain }) => <TagElem domain={domain}>{domain}</TagElem>;

const TagElem = styled.span`
  display: inline-block;
  font-size: 10px;
  color: ${COLORS.white};
  background: ${props => getDomainColor(props.domain)};
  padding: 4px 6px;
  cursor: default;
  user-select: none;
`;

export default Tag;

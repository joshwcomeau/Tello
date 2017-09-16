import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import styled from 'emotion/react';

import { COLORS } from '../../constants';


export default (props) => (
  props.external
    ? <ExternalLink {...props} />
    : <InternalLink {...props} />
);

const linkStyles = props => css`
  position: relative;
  text-decoration: none;
  color: ${props.color || COLORS.blue.light};
  font-weight: ${props.strong ? 'bold' : 'inherit'};

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${props.color || COLORS.blue.light};
    opacity: 0;
    transition: opacity 500ms;
  }

  &:hover:after {
    opacity: 1;
    transition: opacity 150ms;
  }
`

const InternalLink = styled(Link)`
  ${linkStyles};
`;

const ExternalLink = styled.a`
  ${linkStyles};
`;

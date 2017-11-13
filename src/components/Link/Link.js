import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import styled from 'react-emotion';

import { BREAKPOINTS, COLORS } from '../../constants';

// For some weird reason, passing `strong` directly to Link makes React complain
// about invalid props on DOM Nodes. Probably because I'm wrapping a third-party
// component? Using a wrapper is a quick fix.
export default ({ strong, ...props }) => (
  <LinkWrapper strong={strong}>
    {props.external ? <ExternalLink {...props} /> : <InternalLink {...props} />}
  </LinkWrapper>
);

const LinkWrapper = styled.span`
  font-weight: ${props => (props.strong ? 'bold' : 'inherit')};
`;

const linkStyles = props => css`
  position: relative;
  text-decoration: none;
  color: ${props.color || COLORS.blue.light};
  font-weight: ${props.bold ? 'bold' : 'inherit'};

  @media ${BREAKPOINTS.desktop} {
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
  }
`;

const InternalLink = styled(Link)`
  ${linkStyles};
`;

const ExternalLink = styled.a`
  ${linkStyles};
`;

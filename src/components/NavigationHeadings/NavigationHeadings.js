import React, { Component } from 'react';
import styled from 'emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UNITS_IN_PX } from '../../constants';

import Heading from '../Heading';


class NavigationHeadings extends Component {
  static propTypes = {
    activeSection: PropTypes.oneOf(['summary', 'backlog', 'calendar']),
  }

  render() {
    const { activeSection } = this.props;

    const headings = ['Summary', 'Backlog', 'Calendar'];

    return (
      <Wrapper>
        {headings.map(heading => {
          const headingSlug = heading.toLowerCase();
          const isActive = activeSection === headingSlug;

          return (
            <HeadingLink
              key={headingSlug}
              to={`/${headingSlug}`}
              data-active={isActive}
            >
              <Heading theme="light">{heading}</Heading>
            </HeadingLink>
          )
        })}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${UNITS_IN_PX[3]};
`;

const HeadingLink = styled(Link)`
  text-decoration: none;
  margin-right: ${UNITS_IN_PX[2]};
  opacity: ${props => props['data-active'] ? 1 : 0.4};
  transition: opacity ${props => props['data-active'] ? '750ms' : '250ms'};
`

export default NavigationHeadings;

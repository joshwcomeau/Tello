import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { BREAKPOINTS, BREAKPOINT_SIZES, MAX_WIDTH } from '../../constants';

import { getPadding } from './MaxWidthWrapper.helpers';

const propTypes = {
  noPadding: PropTypes.bool,
  noPaddingOnMobile: PropTypes.bool,
};

const MaxWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || MAX_WIDTH.base};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${getPadding};
  padding-right: ${getPadding};

  @media ${BREAKPOINTS.sm} {
    max-width: 100%;
  }

  @media ${BREAKPOINTS.lg} {
    max-width: ${BREAKPOINT_SIZES.md + 'px'};
  }
`;

MaxWidthWrapper.propTypes = propTypes;

export default MaxWidthWrapper;

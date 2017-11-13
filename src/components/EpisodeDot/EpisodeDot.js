import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { COLORS } from '../../constants';

const propTypes = {
  size: PropTypes.number.isRequired,
  hoverScale: PropTypes.number.isRequired,
  isSeen: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func,
};

const defaultProps = {
  hoverScale: 1.2,
};

const EpisodeDot = props =>
  props.onClick ? (
    <EpisodeDotWithHover {...props} />
  ) : (
    <EpisodeDotRoot {...props} />
  );

const EpisodeDotRoot = styled.div`
  display: block;
  float: left;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background-color: ${props =>
    props.isSeen ? COLORS.blue.primary : '#E4E4E4'};
  margin: 1px;
  transition: 250ms;
`;

const EpisodeDotWithHover = styled(EpisodeDotRoot)`
  &:hover {
    transform: scale(${props => props.hoverScale});
    transition: 0ms;
    background-color: ${props =>
      props.isSeen ? COLORS.blue.dark : COLORS.gray.light};
  }
`;

EpisodeDot.propTypes = propTypes;
EpisodeDot.defaultProps = defaultProps;

export default EpisodeDot;

import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import placeholderImage from '../../images/placeholder.png';
import { COLORS, UNITS_IN_PX, HALF_UNIT_PX } from '../../constants';
import { truncateStringByWordCount } from '../../utils';

import Heading from '../Heading';


export const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

const defaultProps = {
  image: placeholderImage,
};


const ShowSearchResult = ({ id, name, image, status, type, summary }) => (
  <Wrapper>
    <Image src={image} />
    <MainContent>
      <Heading size="small">{name}</Heading>
      <Summary>{truncateStringByWordCount(summary, 30)}</Summary>
    </MainContent>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  height: ${UNITS_IN_PX[8]};
  padding: ${HALF_UNIT_PX};
  margin-bottom: ${UNITS_IN_PX[1]}
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.gray.light};
`;

const MainContent = styled.div`
  flex: 1;
`;

const Summary = styled.p`
  padding: ${HALF_UNIT_PX} 0;
  font-size: 13px;
`

const Image = styled.img`
  height: 100%;
  margin-right: ${UNITS_IN_PX[1]};
`;

ShowSearchResult.propTypes = propTypes;
ShowSearchResult.defaultProps = defaultProps

export default ShowSearchResult;

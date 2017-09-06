import React from 'react';
import styled from 'emotion/react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const propTypes = {
  startDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
}

const CalendarWeekPicker = ({ startDate, maxDate }) => {
  return (
    <Wrapper>
      Week of {format(startDate, 'MMMM Do')}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  
`

export default CalendarWeekPicker;

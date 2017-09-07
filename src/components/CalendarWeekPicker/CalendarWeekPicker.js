import React from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import ChevronLeft from 'react-icons/lib/md/chevron-left';
import ChevronRight from 'react-icons/lib/md/chevron-right';

import { incrementWeek, decrementWeek } from '../../actions';
import { COLORS, UNITS_IN_PX } from '../../constants';

import Button from '../Button';


const propTypes = {
  startDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  incrementWeek: PropTypes.func.isRequired,
  decrementWeek: PropTypes.func.isRequired,
}

const CalendarWeekPicker = ({
  startDate,
  endDate,
  maxDate,
  incrementWeek,
  decrementWeek,
}) => (
  <Wrapper>
    <ToggleButton onClick={() => decrementWeek({ startDate, endDate })}>
      <ChevronLeft />
    </ToggleButton>

    <span>
      <Prefix>Week of</Prefix>
      {' '}
      <CurrentWeek>
        {format(startDate, 'MMMM Do')}
      </CurrentWeek>
    </span>

    <ToggleButton onClick={() => incrementWeek({ startDate, endDate })}>
      <ChevronRight />
    </ToggleButton>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${UNITS_IN_PX[18]};
  height: ${UNITS_IN_PX[4]};
  line-height: ${UNITS_IN_PX[2]};
  padding-top: ${UNITS_IN_PX[1]};
  padding-bottom: ${UNITS_IN_PX[1]};
`;

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${UNITS_IN_PX[2]};
  background: transparent;
  border: transparent;
  font-size: 25px;
  color: ${COLORS.deepPurple.light};
  background: rgba(255,255,255,0.06);
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      to top,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.12)
    );
  }
`

const Prefix = styled.span`
  display: inline-block;
  color: ${COLORS.gray.light};
  font-size: 14px;
`;

const CurrentWeek = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
`

const mapStateToProps = state => ({
  startDate: state.calendar.startDate,
  endDate: state.calendar.endDate,
});

const mapDispatchToProps = { incrementWeek, decrementWeek };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeekPicker);

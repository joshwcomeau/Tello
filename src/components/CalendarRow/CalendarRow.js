import React, { PureComponent } from 'react';
import styled from 'emotion/react';
import differenceInDays from 'date-fns/difference_in_days';
import addDays from 'date-fns/add_days';
import isToday from 'date-fns/is_today';
import PropTypes from 'prop-types';

import { COLORS, UNIT, HALF_UNIT_PX } from '../../constants';
import { isBetween } from '../../utils';
import { ShowProps, DateProp } from '../../types';

import CalendarEpisode from '../CalendarEpisode';
import Cell from '../Cell';


const CALENDAR_ROW_HEIGHT = UNIT * 3.5;

class CalendarRow extends PureComponent {
  static propTypes = {
    show: ShowProps.isRequired,
    row: PropTypes.number.isRequired,
    startDate: DateProp.isRequired,
    endDate: DateProp.isRequired,
    isLastRow: PropTypes.bool.isRequired,
  }

  render() {
    const { show, row, startDate, endDate, isLastRow } = this.props;

    return [
      <ShowName
        key={show.name}
        row={row}
        col={1}
        isLastRow={isLastRow}
      >
        {show.name}
      </ShowName>,

      // Render out 7 empty cells, 1 for each day of the week.
      // Starting at 2 since our first column is the show name
      [2, 3, 4, 5, 6, 7, 8].map(col => {
        const date = addDays(startDate, col - 2);

        return (
          <CalendarCell
            key={col}
            highlight={isToday(date)}
            isLastRow={isLastRow}
            row={row}
            col={col}
          />
        );
      }),

      show.episodes
        .filter(episode => (
          isBetween({ date: episode.airstamp,  startDate, endDate })
        ))
        .map(episode => {
          const daysOffset = differenceInDays(episode.airstamp, startDate) + 1;
          const col = daysOffset + 1;

          return (
            <CalendarEpisode
              key={episode.id}
              episode={episode}
              row={row}
              col={col}
              height={CALENDAR_ROW_HEIGHT}
            >
              {episode.name}
            </CalendarEpisode>
          )
        })
    ];
  }
}

const CalendarCell = styled(Cell)`
  height: ${CALENDAR_ROW_HEIGHT + 'px'};
  border-bottom-width: ${props => props.isLastRow ? 0 : '1px'};
  border-bottom-style: solid;
  border-bottom-color: ${COLORS.gray.light};
  border-right-width: ${props => props.col < 8 ? '0.5px' : 0};
  border-right-style: solid;
  border-right-color: ${COLORS.gray.light};
  background-color: ${props => props.highlight
    ? COLORS.highlight.dark
    : 'transparent'
  };
`;


const ShowName = styled(CalendarCell)`
  font-weight: bold;
  padding-top: ${HALF_UNIT_PX};
  padding-right: ${HALF_UNIT_PX};
  color: ${COLORS.gray.veryDark};
  border-right-color: ${COLORS.gray.primary};
`;

export default CalendarRow;

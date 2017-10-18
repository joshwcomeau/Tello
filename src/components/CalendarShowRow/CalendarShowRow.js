import React, { Component } from 'react';
import styled from 'emotion/react';
import addDays from 'date-fns/add_days';
import isToday from 'date-fns/is_today';
import isSameDay from 'date-fns/is_same_day';
import PropTypes from 'prop-types';

import { COLORS, UNIT, HALF_UNIT_PX } from '../../constants';
import { range, isBetween } from '../../utils';
import { ShowProps, DateProp } from '../../types';

import CalendarEpisode from '../CalendarEpisode';
import { Row, Cell } from '../CalendarPrimitives';


const CALENDAR_ROW_HEIGHT = UNIT * 3.5;

class CalendarShowRow extends Component {
  static propTypes = {
    demo: PropTypes.bool,
    show: ShowProps.isRequired,
    startDate: DateProp.isRequired,
    endDate: DateProp.isRequired,
    isLastRow: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    // There are only two times when a show's row changes:
    // - The initial fetch from the server that populates the episodes
    // - When the user toggles an episode as seen/unseen.
    //
    // Using shouldComponentUpdate here because this component's render method
    // is pretty heavy; involves filtering through large lists.
    const receivedData = (
      nextProps.show.episodes.length !== this.props.show.episodes.length
    );

    const toggledEpisode = (
      nextProps.show.seenEpisodeIds !== this.props.show.seenEpisodeIds
    );

    return receivedData || toggledEpisode;
  }

  render() {
    const { demo, show, startDate, endDate, isLastRow } = this.props;

    const relevantEpisodes = show.episodes
      .filter(episode => (
        isBetween({ date: episode.airstamp,  startDate, endDate })
      ));

    return (
      <Row>
        <ShowName isLastRow={isLastRow}>
          {show.name}
        </ShowName>
        {range(7).map(index => {
          const date = addDays(startDate, index);

          const episode = relevantEpisodes.find(episode => (
            isSameDay(episode.airstamp, date)
          ));

          return (
            <CalendarCell
              key={index}
              highlight={isToday(date)}
              isLastRow={isLastRow}
            >
              {episode && (
                <CalendarEpisode
                  onEdge={index === 6}
                  demo={demo}
                  show={show}
                  episode={episode}
                  height={CALENDAR_ROW_HEIGHT}
                >
                  {episode.name}
                </CalendarEpisode>
              )}
            </CalendarCell>
          );
        })}
      </Row>
    );
  }
}

const CalendarCell = styled(Cell)`
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
`;

export default CalendarShowRow;

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import addDays from 'date-fns/add_days';
import PropTypes from 'prop-types';

import { episodesRequest } from '../../actions';
import { COLORS, UNIT, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { getIsFetchingAnyEpisodes } from '../../reducers/tracked-shows.reducer';
import { isBetween } from '../../utils';
import { ShowProps } from '../../types';

import CalendarHeaderCell from '../CalendarHeaderCell';
import CalendarShowRow from '../CalendarShowRow';
import { Row } from '../CalendarPrimitives';
import Spinner from '../Spinner';
import StopTouchPropagation from '../StopTouchPropagation';

class Calendar extends PureComponent {
  static PropTypes = {
    demo: PropTypes.bool,
    shows: PropTypes.arrayOf(ShowProps),
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  };

  render() {
    const { demo, shows, startDate, endDate, isFetchingEpisodes } = this.props;

    // If we're still fetching episodes, show a spinner.
    if (isFetchingEpisodes) {
      return (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      );
    }

    // Filter out any shows that don't have episodes yet.
    const relevantShows = shows.filter(show => {
      if (!show.episodes) {
        return false;
      }

      return show.episodes.some(episode =>
        isBetween({ date: episode.airstamp, startDate, endDate })
      );
    });

    return (
      <Wrapper>
        <StopTouchPropagation>
          <CalendarContainer>
            <Row>
              <CalendarHeaderCell />
              <CalendarHeaderCell date={startDate} />
              <CalendarHeaderCell date={addDays(startDate, 1)} />
              <CalendarHeaderCell date={addDays(startDate, 2)} />
              <CalendarHeaderCell date={addDays(startDate, 3)} />
              <CalendarHeaderCell date={addDays(startDate, 4)} />
              <CalendarHeaderCell date={addDays(startDate, 5)} />
              <CalendarHeaderCell date={addDays(startDate, 6)} />
            </Row>
            {relevantShows.map((show, index) => (
              <CalendarShowRow
                key={show.id}
                demo={demo}
                show={show}
                startDate={startDate}
                endDate={endDate}
                isLastRow={index === shows.length - 1}
              />
            ))}
            {relevantShows.length === 0 && (
              <NoShowsThisWeek>
                Sorry, no new shows airing this week!
              </NoShowsThisWeek>
            )}
          </CalendarContainer>
        </StopTouchPropagation>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  padding: ${HALF_UNIT_PX};
  background: white;
  overflow: auto;
`;

const SpinnerWrapper = styled(Wrapper)`
  padding: ${UNITS_IN_PX[2]};
  display: flex;
  justify-content: center;
`;

const CalendarContainer = styled.div`
  min-width: 800px;
`;

const NoShowsThisWeek = styled.div`
  height: ${UNIT * 5}px;
  line-height: ${UNIT * 5}px;
  text-align: center;
  color: ${COLORS.gray.dark};
  font-size: 22px;
`;

const mapStateToProps = state => ({
  startDate: state.calendar.startDate,
  endDate: state.calendar.endDate,
  isFetchingEpisodes: getIsFetchingAnyEpisodes(state),
});

export default connect(mapStateToProps, { episodesRequest })(Calendar);

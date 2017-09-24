import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';
import addDays from 'date-fns/add_days';
import PropTypes from 'prop-types';

import { episodesRequest } from '../../actions';
import { COLORS, UNIT, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { getIsFetchingAnyEpisodes } from '../../reducers/tracked-shows.reducer';
import { isBetween } from '../../utils';
import { ShowProps } from '../../types';

import CalendarRow from '../CalendarRow';
import CalendarHeaderCell from '../CalendarHeaderCell';
import CalendarCornerCell from '../CalendarCornerCell';
import Heading from '../Heading';
import Spinner from '../Spinner';
import StopTouchPropagation from '../StopTouchPropagation';


class Calendar extends PureComponent {
  static PropTypes = {
    shows: PropTypes.arrayOf(ShowProps),
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }

  renderFallback() {
    return (
      <FallbackWrapper>
        <Heading>Sorry, not available. 🐼</Heading>
        <FallbackParagraph>
          The calendar relies on modern browser features.
          It ought to work on latest versions of Chrome, Firefox, or Safari.
          <br /><br />
          Sorry for the inconvenience!
        </FallbackParagraph>
      </FallbackWrapper>
    )
  }

  render() {
    const { shows, startDate, endDate, isFetchingEpisodes } = this.props;

    // If we're still fetching episodes, show a spinner.
    if (isFetchingEpisodes) {
      return (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )
    }

    // Filter out any shows that don't have episodes yet.
    const relevantShows = shows.filter(show => {
      if (!show.episodes) {
        return false;
      }

      return show.episodes.some(episode => (
        isBetween({ date: episode.airstamp,  startDate, endDate })
      ));
    });

    // On browsers that don't support CSS grid, return a fallback :(
    const supportsCssGrid = CSS.supports && CSS.supports('display', 'grid');
    if (!supportsCssGrid) {
      return this.renderFallback();
    }

    return (
      <Wrapper>
        <StopTouchPropagation>
          <CalendarGrid>
            <CalendarCornerCell row={1} col={1} />
            <CalendarHeaderCell date={startDate} row={1} col={2} />
            <CalendarHeaderCell date={addDays(startDate, 1)} row={1} col={3} />
            <CalendarHeaderCell date={addDays(startDate, 2)} row={1} col={4} />
            <CalendarHeaderCell date={addDays(startDate, 3)} row={1} col={5} />
            <CalendarHeaderCell date={addDays(startDate, 4)} row={1} col={6} />
            <CalendarHeaderCell date={addDays(startDate, 5)} row={1} col={7} />
            <CalendarHeaderCell date={addDays(startDate, 6)} row={1} col={8} />

            {relevantShows.map((show, index) => (
              <CalendarRow
                key={show.id}
                show={show}
                row={index + 2 /* Account for zero-index + header row */}
                startDate={startDate}
                endDate={endDate}
                isLastRow={index === shows.length - 1}
              />
            ))}
            {relevantShows.length === 0 && [
              <NoShowSpacer key="spacer" />,
              <NoShowsThisWeek key="message">
                Sorry, no new shows airing this week!
              </NoShowsThisWeek>
            ]}
          </CalendarGrid>
        </StopTouchPropagation>
      </Wrapper>
    );
  }
}

const FallbackWrapper = styled.div`
  padding: ${UNITS_IN_PX[2]};
  text-align: center;
  color: ${COLORS.gray.veryDark};
  background: white;
`;

const FallbackParagraph = styled.p`
  max-width: 440px;
  text-align: left;
  font-size: 20px;
  margin: auto;
`;

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

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
  min-width: 800px;
`;

const NoShowSpacer = styled.div`
  grid-column-start: 1;
  grid-row-start: 2;
  border-right: 1px solid ${COLORS.gray.primary};
  background: ${COLORS.highlight.dark};
`;

const NoShowsThisWeek = styled.div`
  grid-column-start: 2;
  grid-column-end: 9;
  grid-row-start: 2;
  height: ${UNIT * 3.5}px;
  line-height: ${UNIT * 3.5}px;
  text-align: center;
  color: ${COLORS.gray.dark};
  font-size: 22px;
`

const mapStateToProps = state => ({
  startDate: state.calendar.startDate,
  endDate: state.calendar.endDate,
  isFetchingEpisodes: getIsFetchingAnyEpisodes(state),
});

export default connect(mapStateToProps, { episodesRequest })(Calendar);

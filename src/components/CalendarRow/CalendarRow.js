import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import styled from 'emotion/react';
import differenceInDays from 'date-fns/difference_in_days';

import { episodesRequest } from '../../actions';
import { COLORS, HALF_UNIT_PX, UNITS_IN_PX } from '../../constants';
import { isBetween } from '../../utils';


class CalendarRow extends PureComponent {
  componentDidMount() {
    const { show, episodesRequest } = this.props;

    // If we don't yet have any `episodes` for this show, we have to fetch
    // them! We can make a few assumptions though:
    // - The list of episodes won't change externally in a given session,
    //   so if we already have them, we don't need to fetch them.
    // - We only have to do this check on mount, because a given BacklogRow
    //   will never change shows after mount.
    if (!show.episodes) {
      episodesRequest({ showId: show.id });
    }
  }

  render() {
    const { show, startDate, endDate, rowNum } = this.props;

    const episodes = show.episodes || [];

    return ([
      <ShowName key={show.name} row={rowNum} col={1}>
        {show.name}
      </ShowName>,

      episodes
        .filter(episode => (
          isBetween({ date: episode.airstamp,  startDate, endDate})
        ))
        .map(episode => {
          const daysOffset = differenceInDays(episode.airstamp, startDate) + 1;
          const col = daysOffset + 1;

          return (
            <EpisodeCell
              key={episode.id}
              row={rowNum}
              col={col}
            >
              {episode.name}
            </EpisodeCell>
          )
        })
    ])
  }
}

const Cell = props => css`
  grid-column-start: ${props.col};
  grid-row-start: ${props.row};
`;

const ShowName = styled.div`
  ${Cell};
  font-weight: bold;
`;

const EpisodeCell = styled.div`
  ${Cell};
`


export default connect(null, { episodesRequest })(CalendarRow);

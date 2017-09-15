import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'emotion/react';

import { COLORS, UNITS_IN_PX } from '../../constants';
import {
  getTrackedShowsWithUnseenEpisodesArray,
} from '../../reducers/tracked-shows.reducer';
import { sortShows } from '../../helpers/show.helpers';

import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import BacklogRow from '../BacklogRow';
import SortShows from '../SortShows';



class LandingPageBacklog extends PureComponent {
  render() {
    const { shows } = this.props;

    console.log(shows);
    if (!shows) {
      return null;
    }

    return (
      <LandingPageBacklogElem>
        <MaxWidthWrapper>
          <Heading theme="vibrant">Unseen Episodes</Heading>
          <Paragraph size="large">
            Need something to watch? The Backlog displays shows with unseen episodes in rows, so you can quickly pick up where you left off.
          </Paragraph>

          <SortShows />

          {shows.map(show => (
            show.episodes
              ? <BacklogRow demo key={show.id} show={show} />
              : null
          ))}
        </MaxWidthWrapper>
      </LandingPageBacklogElem>
    );
  }
}

const LandingPageBacklogElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  padding-bottom: ${UNITS_IN_PX[5]};
  /* Hide the Glow from overlapping the Hero */
  overflow: hidden;
`;


const mapStateToProps = state => ({
  shows: sortShows({
    shows: getTrackedShowsWithUnseenEpisodesArray(state),
    sorting: state.ui.sorting,
  }),
  // NOTE: we need to return `sorting` so that the component re-renders
  // We don't actually need this prop though.
  sorting: state.ui.sorting,
});

export default connect(mapStateToProps)(LandingPageBacklog);

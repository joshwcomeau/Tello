import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { BREAKPOINTS, UNITS_IN_PX, ROW_HEIGHT_PX } from '../../constants';
import { getTrackedShowsWithUnseenEpisodesArray } from '../../reducers/tracked-shows.reducer';
import { sortShows } from '../../helpers/show.helpers';

import Heading from '../Heading';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Paragraph from '../Paragraph';
import BacklogRow from '../BacklogRow';
import SortShows from '../SortShows';

class LandingPageBacklog extends PureComponent {
  render() {
    const { shows } = this.props;

    if (!shows) {
      return null;
    }

    const relevantShows = shows.filter(
      show => show.name === 'Stranger Things' || show.name === 'Steven Universe'
    );

    return (
      <LandingPageBacklogElem>
        <MaxWidthWrapper>
          <Heading theme="vibrant">Unseen Episodes</Heading>
          <Paragraph size="large">
            Need something to watch? The Backlog displays shows with unseen
            episodes in rows, so you can quickly pick up where you left off.
          </Paragraph>

          <Paragraph size="large">
            Click an episode to mark it as seen.
          </Paragraph>

          <SortShows />

          {relevantShows.map(
            show =>
              show.episodes ? (
                <BacklogRow demo key={show.id} show={show} />
              ) : null
          )}

          <FakeBacklogItem />
        </MaxWidthWrapper>
      </LandingPageBacklogElem>
    );
  }
}

const LandingPageBacklogElem = styled.div`
  padding-top: ${UNITS_IN_PX[5]};
  padding-bottom: ${UNITS_IN_PX[5]};
`;

const FakeBacklogItem = styled.div`
  position: relative;
  height: ${ROW_HEIGHT_PX};
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  /* hide :after shadow */
  overflow: hidden;

  @media ${BREAKPOINTS.desktop} {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: ${UNITS_IN_PX[15]};
      height: ${ROW_HEIGHT_PX};
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.4);
    }
  }
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

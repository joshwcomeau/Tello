// NOTE: Most selectors are co-located with their reducers.
// This file holds cross-reducer selectors.
import { createSelector } from 'reselect';

import { getTrackedShows } from '../reducers/auth.reducer';
import { getShowsArray } from '../reducers/shows.reducer';
import { getEpisodes } from '../reducers/episodes.reducer';


export const getPopulatedShowData = createSelector(
  getTrackedShows,
  getShowsArray,
  getEpisodes,
  (trackedShows, showsArray, episodes) => {
    // `trackedShows` has the following shape:
    // [{ id: 123, seenEpisodes: [1, 2, 3] }]
    // We want to pull the associated shows and episodes from their
    // respective reducers, and denormalize them into a nested structure.
    console.log({ trackedShows, showsArray, episodes })
  }
)

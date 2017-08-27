import { MODAL_IDS } from '../constants';


export const START_TRACKING_NEW_SHOWS = 'START_TRACKING_NEW_SHOWS';
export const FAILURE_SYNCING_NEW_SHOWS = 'FAILURE_SYNCING_NEW_SHOWS';
export const REMOVE_SHOW = 'REMOVE_SHOW';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const TOGGLE_EPISODE = 'TOGGLE_EPISODE';
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_RECEIVE = 'USER_DATA_RECEIVE';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';
export const EPISODES_REQUEST = 'EPISODES_REQUEST';
export const EPISODES_RECEIVE = 'EPISODES_RECEIVE';
export const EPISODES_FAILURE = 'EPISODES_FAILURE';


export const startTrackingNewShows = ({ shows }) => ({
  type: START_TRACKING_NEW_SHOWS,
  shows,
});

export const failureSyncingNewShows = ({ shows }) => ({
  type: FAILURE_SYNCING_NEW_SHOWS,
  shows,
});

export const showModal = ({ id, side }) => ({
  type: SHOW_MODAL,
  id,
  side,
});

export const hideModal = ({ side }) => ({
  type: HIDE_MODAL,
  side,
});

export const toggleEpisode = ({ showId, episodeId }) => ({
  type: TOGGLE_EPISODE,
  showId,
  episodeId,
});

// Convenience wrapper around `showModal`
export const showAddShowModal = () => (
  showModal({ id: MODAL_IDS.addShow, side: 'right' })
);

export const userDataRequest = () => ({
  type: USER_DATA_REQUEST,
});

export const userDataReceive = (data) => ({
  type: USER_DATA_RECEIVE,
  data,
});

export const userDataFailure = (error) => ({
  type: USER_DATA_FAILURE,
  error,
});

export const episodesRequest = ({ showId }) => ({
  type: EPISODES_REQUEST,
  showId,
});

export const episodesReceive = ({ showId, episodes }) => ({
  type: EPISODES_RECEIVE,
  showId,
  episodes,
});

export const episodesFailure = ({ error }) => ({
  type: EPISODES_FAILURE,
  error,
});

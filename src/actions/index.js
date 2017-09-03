import { MODAL_IDS } from '../constants';


export const START_TRACKING_NEW_SHOWS = 'START_TRACKING_NEW_SHOWS';
export const FAILURE_SYNCING_NEW_SHOWS = 'FAILURE_SYNCING_NEW_SHOWS';
export const REMOVE_SHOW = 'REMOVE_SHOW';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const TOGGLE_EPISODE = 'TOGGLE_EPISODE';
export const MARK_EPISODE_AS_SEEN = 'MARK_EPISODE_AS_SEEN';
export const MARK_EPISODE_AS_UNSEEN = 'MARK_EPISODE_AS_UNSEEN';
export const MARK_SEASON_AS_SEEN = 'MARK_SEASON_AS_SEEN';
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_RECEIVE = 'USER_DATA_RECEIVE';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';
export const DELETE_SHOW_REQUEST = 'DELETE_SHOW_REQUEST';
export const DELETE_SHOW_RECEIVE = 'DELETE_SHOW_RECEIVE';
export const DELETE_SHOW_FAILURE = 'DELETE_SHOW_FAILURE';
export const EPISODES_REQUEST = 'EPISODES_REQUEST';
export const EPISODES_RECEIVE = 'EPISODES_RECEIVE';
export const EPISODES_FAILURE = 'EPISODES_FAILURE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';


export const startTrackingNewShows = ({ shows }) => ({
  type: START_TRACKING_NEW_SHOWS,
  shows,
});

export const failureSyncingNewShows = ({ shows }) => ({
  type: FAILURE_SYNCING_NEW_SHOWS,
  shows,
});

export const showModal = ({ id, side, data }) => ({
  type: SHOW_MODAL,
  id,
  side,
  data,
});

export const hideModal = ({ side }) => ({
  type: HIDE_MODAL,
  side,
});

export const toggleEpisode = ({
  showId,
  showName,
  episodeId,
  episodeName
}) => ({
  type: TOGGLE_EPISODE,
  showId,
  showName,
  episodeId,
  episodeName
});

export const markEpisodeAsSeen = ({
  showId,
  showName,
  episodeId,
  episodeName
}) => ({
  type: MARK_EPISODE_AS_SEEN,
  showId,
  showName,
  episodeId,
  episodeName,
});

export const markEpisodeAsUnseen = ({
  showId,
  showName,
  episodeId,
  episodeName
}) => ({
  type: MARK_EPISODE_AS_UNSEEN,
  showId,
  showName,
  episodeId,
  episodeName,
});

export const markSeasonAsSeen = ({
  showId,
  showName,
  episodeIds,
}) => ({
  type: MARK_SEASON_AS_SEEN,
  showId,
  showName,
  episodeIds,
});

// Convenience wrappers around `showModal`
export const showAddShowModal = () => (
  showModal({ id: MODAL_IDS.addShow, side: 'right', data: {} })
);
export const showEditShowModal = ({ showId }) => (
  showModal({ id: MODAL_IDS.editShow, side: 'left', data: { showId } })
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

export const deleteShowRequest = () => ({
  type: DELETE_SHOW_REQUEST,
});

export const deleteShowReceive = (data) => ({
  type: DELETE_SHOW_RECEIVE,
  data,
});

export const deleteShowFailure = (error) => ({
  type: DELETE_SHOW_FAILURE,
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

export const hideFlashMessage = () => ({
  type: HIDE_FLASH_MESSAGE,
});

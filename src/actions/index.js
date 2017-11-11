import addWeeks from 'date-fns/add_weeks';

import { MODAL_IDS } from '../constants';

export const ADD_SHOWS_REQUEST = 'ADD_SHOWS_REQUEST';
export const ADD_SHOWS_RECEIVE = 'ADD_SHOWS_RECEIVE';
export const ADD_SHOWS_FAILURE = 'ADD_SHOWS_FAILURE';
export const START_TRACKING_NEW_SHOWS = 'START_TRACKING_NEW_SHOWS';
export const FAILURE_SYNCING_NEW_SHOWS = 'FAILURE_SYNCING_NEW_SHOWS';
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
export const CHANGE_SORTING = 'CHANGE_SORTING';
export const UPDATE_CALENDAR_WEEK = 'UPDATE_CALENDAR_WEEK';
export const SWIPE_MOBILE_VIEW = 'SWIPE_MOBILE_VIEW';
export const TAP_SWIPE_INDICATOR = 'TAP_SWIPE_INDICATOR';
export const LOGOUT = 'LOGOUT';
export const LOAD_UNAUTHORIZED_ROUTE = 'LOAD_UNAUTHORIZED_ROUTE';

export const addShowsRequest = ({ shows }) => ({
  type: ADD_SHOWS_REQUEST,
  shows,
});

export const addShowsReceive = ({ shows, showNotification = true }) => ({
  type: ADD_SHOWS_RECEIVE,
  shows,
  showNotification,
});

export const addShowsFailure = ({ error, shows }) => ({
  type: ADD_SHOWS_FAILURE,
  error,
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
  demo = false,
  showId,
  showName,
  episodeId,
  episodeName,
}) => ({
  type: TOGGLE_EPISODE,
  demo,
  showId,
  showName,
  episodeId,
  episodeName,
});

export const markEpisodeAsSeen = ({
  demo,
  showId,
  showName,
  episodeId,
  episodeName,
}) => ({
  type: MARK_EPISODE_AS_SEEN,
  demo,
  showId,
  showName,
  episodeId,
  episodeName,
});

export const markEpisodeAsUnseen = ({
  demo,
  showId,
  showName,
  episodeId,
  episodeName,
}) => ({
  type: MARK_EPISODE_AS_UNSEEN,
  demo,
  showId,
  showName,
  episodeId,
  episodeName,
});

export const markSeasonAsSeen = ({ showId, showName, episodeIds }) => ({
  type: MARK_SEASON_AS_SEEN,
  showId,
  showName,
  episodeIds,
});

// Convenience wrappers around `showModal`
export const showAddShowModal = () =>
  showModal({ id: MODAL_IDS.addShow, side: 'right', data: {} });
export const showEditShowModal = ({ showId }) =>
  showModal({ id: MODAL_IDS.editShow, side: 'left', data: { showId } });
export const showLoggedOutMenuModal = () =>
  showModal({ id: MODAL_IDS.mobileLoggedOutMenu, side: 'right' });

export const userDataRequest = () => ({
  type: USER_DATA_REQUEST,
});

export const userDataReceive = data => ({
  type: USER_DATA_RECEIVE,
  data,
});

export const userDataFailure = error => ({
  type: USER_DATA_FAILURE,
  error,
});

export const deleteShowRequest = ({ showId, showName }) => ({
  type: DELETE_SHOW_REQUEST,
  showId,
  showName,
});

export const deleteShowReceive = ({ showId, showName }) => ({
  type: DELETE_SHOW_RECEIVE,
  showId,
  showName,
});

export const deleteShowFailure = ({ showId, showName, error }) => ({
  type: DELETE_SHOW_FAILURE,
  showId,
  showName,
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

export const changeSorting = ({ sorting }) => ({
  type: CHANGE_SORTING,
  sorting,
});

export const updateCalendarWeek = ({ startDate, endDate }) => ({
  type: UPDATE_CALENDAR_WEEK,
  startDate,
  endDate,
});

export const incrementWeek = ({ startDate, endDate }) => ({
  type: UPDATE_CALENDAR_WEEK,
  startDate: addWeeks(startDate, 1),
  endDate: addWeeks(endDate, 1),
});

export const decrementWeek = ({ startDate, endDate }) => ({
  type: UPDATE_CALENDAR_WEEK,
  startDate: addWeeks(startDate, -1),
  endDate: addWeeks(endDate, -1),
});

export const swipeMobileView = index => {
  return {
    type: SWIPE_MOBILE_VIEW,
    index,
  };
};

export const tapSwipeIndicator = () => {
  return {
    type: TAP_SWIPE_INDICATOR,
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const loadUnauthorizedRoute = () => ({
  type: LOAD_UNAUTHORIZED_ROUTE,
});

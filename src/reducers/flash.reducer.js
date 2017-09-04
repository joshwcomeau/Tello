import { createSelector } from 'reselect';

import {
  markEpisodeAsUnseen,
  HIDE_FLASH_MESSAGE,
  ADD_SHOWS_RECEIVE,
  ADD_SHOWS_FAILURE,
  MARK_EPISODE_AS_SEEN,
  DELETE_SHOW_RECEIVE,
  DELETE_SHOW_FAILURE,
} from '../actions';

/*
  null | {
    messageType: 'alert' | 'success' | 'error',
    message: string,
    action: null | {
      label: string,
      onClick: ActionCreator
    }
  }
*/
const initialState = null;

export default function reducer(state = initialState, action) {
  const { type, ...data } = action;

  switch (action.type) {
    case HIDE_FLASH_MESSAGE: {
      return null;
    }

    case ADD_SHOWS_RECEIVE: {
      const numOfShows = action.shows.length;
      const message = numOfShows === 1
        ? `Started tracking "${action.shows[0].name}".`
        : `Started tracking ${numOfShows} new shows.`;

      return {
        messageType: 'success',
        message: message,
      };
    }

    case ADD_SHOWS_FAILURE: {
      return {
        messageType: 'error',
        message: 'Sorry, new shows could not be created. Please try again later',
      };
    }

    case MARK_EPISODE_AS_SEEN: {
      const { showId, showName, episodeId, episodeName } = action;

      return {
        messageType: 'success',
        message: `"${episodeName}" of <strong>${showName}</strong> has been marked as seen. `,
        action: markEpisodeAsUnseen({ showId, showName, episodeId, episodeName }),
        actionLabel: 'Undo',
      };
    }

    case DELETE_SHOW_FAILURE: {
      const { showName } = action;

      return {
        messageType: 'error',
        message: `"${showName}" could not be deleted. Please try again later.`,
      };
    }

    default:
      return state;
  }
}


// Selectors
export const getMessage = state => state.flash && state.flash.message;
export const getMessageType = state => state.flash && state.flash.messageType;
export const getAction = state => state.flash && state.flash.action;
export const getActionLabel = state => state.flash && state.flash.actionLabel;

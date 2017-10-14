import Cookies from 'cookies-js';

import { debounce } from '../utils';
import {
  AUTH_TOKEN_KEY,
  LOCAL_STORAGE_REDUX_DATA_KEY,
  SORT_OPTIONS,
} from '../constants';


// NOTE: I ran into an annoying bug. Bear with the explanation.
// We debounce all LocalStorage updates, to avoid spamming the synchronous
// storage call. Our "Remove" method, used when logging in, is not debounced.
// This led to the issue of removing all data, only for it to be restored a
// few hundred ms later, when the debounce for the 'update' completes.
// By storing a variable for the timeout ID at the module level, we can store
// the timeout ID when debounce fires, and clear it when we want to remove
// all data.
let timeoutId = null;

/**
 * updateLocalStorage
 * Persist the arguments to localStorage, debouncing to avoid making too many
 * calls.
 */
const updateLocalStorage = debounce(
  (...args) => localStorage.setItem(...args),
  2500,
  timeoutId
);


/**
 * handleStoreUpdates
 * Whenever the Redux store updates, we pluck out the state we care about and
 * persist it to localStorage.
 */
export const handleStoreUpdates = function handleStoreUpdates(store) {
  // Omit modals and flash messages, we don't want to rehydrate this.
  // We also omit the calendar, since presumably you care more about the present week,
  // not the week you were looking at last time.
  const { modals, flash, calendar, ...relevantState} = store.getState();

  // Omit the user's auth token; this is already stored via cookie.
  if (relevantState.auth) {
    const {token, ...relevantAuthState} = relevantState.auth;

    relevantState.auth = relevantAuthState;
  }

  updateLocalStorage(
    LOCAL_STORAGE_REDUX_DATA_KEY,
    JSON.stringify(relevantState)
  );
}

/**
 * clearReduxData
 * Deletes the localStorage entry created by `handleStoreUpdates`, and clears
 * the debounce timeout so that any queued updates are cancelled.
 * Useful when logging out, to avoid having the user's personal show information
 * leak to the logged-out homepage (and vice-versa).
 */
export const clearReduxData = () => {
  window.clearTimeout(timeoutId);

  window.localStorage.removeItem(LOCAL_STORAGE_REDUX_DATA_KEY);
};

/**
 * getInitialState
 * Builds the initial Redux state, using data in localStorage, as well as the
 * auth token from the cookie. Handles validating and resetting the state as
 * needed.
 */
export const getInitialState = (defaultState) => {
  const initialState = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_REDUX_DATA_KEY) || '{}'
  );

  // A note on the authentication token.
  //
  // This token comes from the server, sent down via cookie after successful
  // google auth. We then use it when we instantiate Redux, so that we can do
  // checks to see if the user is logged in (or, at least, has an auth token).
  //
  // Sadly, this means it's duplicated across localStorage and cookies.
  //
  // This final step is necessary to hydrate it from the cookie.
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (token) {
    if (!initialState.auth) {
      initialState.auth = {};
    }

    initialState.auth.token = token;
  }

  // If an outdated sort key was persisted, delete it to avoid issues.
  const validSortOptions = Object.keys(SORT_OPTIONS);
  const persistedSort = initialState.ui && initialState.ui.sorting;

  if (persistedSort && !validSortOptions.includes(persistedSort)) {
    delete initialState.ui;
  }

  return initialState;
}

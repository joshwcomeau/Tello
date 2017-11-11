import Cookies from 'cookies-js';

import { debounce } from '../utils';
import {
  AUTH_TOKEN_KEY,
  LOCAL_STORAGE_REDUX_DATA_KEY,
  SORT_OPTIONS,
} from '../constants';

/**
 * updateLocalStorage
 * When a non-null value is provided, updates local-storage with the supplied
 * value. When `null` is provided, it erases all previously-stored local-storage
 * data
 */
const updateLocalStorage = debounce(
  value =>
    value !== null
      ? localStorage.setItem(LOCAL_STORAGE_REDUX_DATA_KEY, value)
      : localStorage.removeItem(LOCAL_STORAGE_REDUX_DATA_KEY),
  500
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
  const { modals, flash, calendar, ...relevantState } = store.getState();

  // Omit the user's auth token; this is already stored via cookie.
  if (relevantState.auth) {
    const { token, ...relevantAuthState } = relevantState.auth;

    relevantState.auth = relevantAuthState;
  }

  updateLocalStorage(JSON.stringify(relevantState));
};

/**
 * clearReduxData
 * Erases all local-storage state.
 * Useful when logging out, to avoid having the user's personal show information
 * leak to the logged-out homepage (and vice-versa).
 */
export const clearReduxData = () => {
  // Immediately erase the data stored in localStorage
  window.localStorage.removeItem(LOCAL_STORAGE_REDUX_DATA_KEY);

  // A subtle bug was introduced, because while the removal was synchronous,
  // persisting new data is async, with that debounce above. And so the storage
  // would be cleared, but then re-populated a second later.
  // To solve that, we'll send a null update, which will kill any updates
  // currently in the queue.
  updateLocalStorage(null);
};

/**
 * getInitialState
 * Builds the initial Redux state, using data in localStorage, as well as the
 * auth token from the cookie. Handles validating and resetting the state as
 * needed.
 */
export const getInitialState = defaultState => {
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
};

import Cookies from 'cookies-js';

import { debounce } from '../utils';
import {
  AUTH_TOKEN_KEY,
  LOCAL_STORAGE_REDUX_DATA_KEY,
  SORT_OPTIONS,
} from '../constants';


// TODO: Fix `handleStoreUpdates` and `clearReduxData` interop.
// There's a rather nasty bug with this implementation.
// The updating is debounced, but the deletion is synchronous and instant.
// This means that if the state changes, and then you delete the state,
// a second or two later, the debounce will be up, and the deleted state
// will resurrect in localStorage.
// The solution is to roll our own debounce, so that we have access to the
// timeoutId, and can clear it when the `clearReduxData` method is fired.

// When our page first loads, a bunch of redux actions are dispatched rapidly
// (each show needs to request and then receive their episodes, so the minimum
// number of actions is 2n, where `n` is the number of shows).
// We don't need to update localStorage _that_ often, so let's debounce it.
const updateLocalStorage = debounce(
  (...args) => localStorage.setItem(...args),
  2500
);


// Whenever the store updates, store relevant parts in localStorage.
// This way, we can initialize the store on page refresh, and have the data
// available instantly :)
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

export const clearReduxData = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_REDUX_DATA_KEY);
};

// Get the initial state from localStorage, and do a bunch of annoying
// data-mungy things to make sure everything initializes properly.
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

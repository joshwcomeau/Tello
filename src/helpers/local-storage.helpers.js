import { LOCAL_STORAGE_REDUX_DATA_KEY } from '../constants';
import { debounce } from '../utils';


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
  const { modals, flash, ...relevantState} = store.getState();

  updateLocalStorage(
    LOCAL_STORAGE_REDUX_DATA_KEY,
    JSON.stringify(relevantState)
  );
}

export const clearReduxData = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_REDUX_DATA_KEY);
};

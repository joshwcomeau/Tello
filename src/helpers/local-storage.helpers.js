import { LOCAL_STORAGE_REDUX_DATA_KEY } from '../constants';
import { isEmpty, generateDebouncedLocalStorageSetter } from '../utils';


// When our page first loads, a bunch of redux actions are dispatched rapidly
// (each show needs to request and then receive their episodes, so the minimum
// number of actions is 2n, where `n` is the number of shows).
// We don't need to update localStorage _that_ often, so let's debounce it.
const updateLocalStorage = generateDebouncedLocalStorageSetter(2500);

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

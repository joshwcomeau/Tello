import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import createAPIMiddleware from '../middlewares/api.middleware';
import { handleStoreUpdates } from '../helpers/local-storage.helpers';

export default function configureStore(history, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(history), createAPIMiddleware())
  );

  // Commit all relevant changes to the state to localStorage, for quick
  // hydration next visit.
  store.subscribe(() => {
    handleStoreUpdates(store);
  });

  return store;
}

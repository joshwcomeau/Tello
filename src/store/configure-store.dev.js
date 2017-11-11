import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import createAPIMiddleware from '../middlewares/api.middleware';
import { handleStoreUpdates } from '../helpers/local-storage.helpers';
import DevTools from '../components/DevTools';

export default function configureStore(history, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), createAPIMiddleware()),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  // Commit all relevant changes to the state to localStorage, for quick
  // hydration next visit.
  store.subscribe(() => {
    handleStoreUpdates(store);
  });

  return store;
}

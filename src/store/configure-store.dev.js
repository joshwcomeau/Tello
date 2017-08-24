import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';
import createAPIMiddleware from '../middlewares/api.middleware';
import DevTools from '../components/DevTools';


export default function configureStore(history) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(routerMiddleware(history), createAPIMiddleware()),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}

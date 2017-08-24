import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import createAPIMiddleware from '../middlewares/api.middleware';


export default function configureStore(history, initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(history), createAPIMiddleware())
  );
}

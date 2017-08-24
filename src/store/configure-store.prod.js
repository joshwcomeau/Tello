import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import createAPIMiddleware from '../middlewares/api.middleware';


export default function configureStore(history) {
  return createStore(
    rootReducer,
    applyMiddleware(routerMiddleware(history), createAPIMiddleware())
  );
}

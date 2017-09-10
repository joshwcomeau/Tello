import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import Cookies from 'cookies-js';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import configureStore from './store';
import { AUTH_TOKEN_KEY } from './constants';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import DevTools from './components/DevTools';

import './polyfills';
import './global-styles';

const history = createHistory();

const initialState = {
  auth: {
    token: Cookies.get(AUTH_TOKEN_KEY),
  },
  calendar: {
    startDate: startOfWeek(new Date()),
    endDate: endOfWeek(new Date()),
  },
}

const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
        <DevTools />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

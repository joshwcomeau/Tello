import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import Cookies from 'cookies-js';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import configureStore from './store';
import { AUTH_TOKEN_KEY, LOCAL_STORAGE_REDUX_DATA_KEY } from './constants';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import DevTools from './components/DevTools';

import './polyfills';
import './global-styles';

const history = createHistory();

const localState = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_REDUX_DATA_KEY) || '{}'
);

const defaultState = {
  auth: {},
  calendar: {
    startDate: startOfWeek(new Date()),
    endDate: endOfWeek(new Date()),
  },
  mobile: {
    activeViewIndex: 0,
    hasSeenSwipeIndicator: false,
  },
};

const initialState = {
  ...defaultState,
  ...localState,
};

// A note on the authentication token.
//
// This token comes from the server, sent down via cookie after successful
// google auth. We then use it when we instantiate Redux, so that we can do
// checks to see if the user is logged in (or, at least, has an auth token).
//
// To avoid having it duplicated across cookie and localStorage, we do not
// persist it in localStorage, and so it won't be hydrated by `localState`.
//
// This final step is necessary to hydrate it from the cookie.
const token = Cookies.get(AUTH_TOKEN_KEY);
if (token) {
  initialState.auth.token = token;
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

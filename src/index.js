import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import Cookies from 'cookies-js';

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
    // We'll assume that if they have an auth token stored in a cookie, they're
    // logged in at first. Of course this will need to be validated by the server,
    // but this way we can avoid the logged-out-flash. The odds of an invalid
    // token are very low, since the cookie never expires.
    isLoggedIn: !!Cookies.get(AUTH_TOKEN_KEY),
  },
}

const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App />
        <DevTools />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

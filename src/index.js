import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import { getInitialState } from './helpers/local-storage.helpers';
import configureStore from './store';
// import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import DevTools from './components/DevTools';

import './polyfills';
import './global-styles';

const history = createHistory();

const initialState = getInitialState();

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

// Disable service-worker for now, until I can work out how to disable caching
// on a route-by-route basis.
// registerServiceWorker();

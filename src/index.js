import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import DevTools from './components/DevTools';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

import './polyfills';
import './global-styles';


const store = configureStore();

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

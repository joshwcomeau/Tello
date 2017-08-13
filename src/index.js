import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './polyfills';
import './global-styles';


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

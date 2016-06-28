import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './source/js/reducers/reducers_index.js'

import App from './source/js/components/App.js'

import './source/css/global.sass'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.jsx';

import {Provider} from 'react-redux'

import generateStore from './redux/store'
const store =generateStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



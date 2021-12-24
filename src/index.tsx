import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { pageName } from './redux/page';
import { tempInFahrenheit } from './redux/tempInFahrenheit';
import { currentLocation } from './redux/currentLocation';
import { favoriteLocations } from './redux/favoriteLocations';

import App from './App';

import './css/index.css';

const reduxStore = createStore(
  combineReducers({ pageName, tempInFahrenheit, currentLocation, favoriteLocations })
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


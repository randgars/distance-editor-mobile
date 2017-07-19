import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import App from './app';
import configureStore from './stores/';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <App />    
  </Provider>
)

AppRegistry.registerComponent('androidNavigator', () => ReduxApp);

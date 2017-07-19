import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from './stores/';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <Text>fuck yeah</Text>
  </Provider>
)

AppRegistry.registerComponent('androidNavigator', () => ReduxApp);

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
  <Text>fgrfg</Text>
)

AppRegistry.registerComponent('androidNavigator', () => ReduxApp);

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import AppComponent from './components/app';
import configureStore from './stores/';

import App from './app'


// const ReduxApp = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

AppRegistry.registerComponent('androidNavigator', () => App);

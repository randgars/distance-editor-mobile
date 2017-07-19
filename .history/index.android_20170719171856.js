import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import AppComponent from './components/app';
import App from './app';
import configureStore from './stores/';




AppRegistry.registerComponent('androidNavigator', () => App);

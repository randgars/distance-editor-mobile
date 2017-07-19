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

export default class androidNavigator extends Component {
  render() {
    return (
      <View></View>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => androidNavigator);

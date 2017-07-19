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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View >
          <Text>fuck yeah</Text>
        </View>
      </Provider>
    );
  }
}
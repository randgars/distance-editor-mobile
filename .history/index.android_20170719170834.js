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

AppRegistry.registerComponent('androidNavigator', () => App);

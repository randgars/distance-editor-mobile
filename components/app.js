import React from 'react';
import { AppRegistry } from 'react-native'
import { Root, StyleProvider  } from 'native-base'
import Drawer from './drawer'
import { StackNavigator  } from 'react-navigation';

import getTheme from '../themes/components';
import lightTheme from '../themes/variables/lightTheme';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme(lightTheme)}>
          <MainScreenNavigator screenProps={this.props}/>
        </StyleProvider>
      </Root>
    );
  }
}

const MainScreenNavigator = StackNavigator (
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
)

AppRegistry.registerComponent('androidNavigator', () => App);
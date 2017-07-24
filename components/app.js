import React from 'react';
import { AppRegistry } from 'react-native'
import { Root } from 'native-base'
import Drawer from './drawer'
import { StackNavigator  } from 'react-navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Root>
        <MainScreenNavigator screenProps={this.props}/>
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
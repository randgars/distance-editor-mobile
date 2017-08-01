import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native'
import MapComponent from './map'
import Directions from './directions'
import SideBar from './sidebar'
import EnterKey from './enterKey'

const Drawer = DrawerNavigator(
  {
    Map: { screen: MapComponent },
    Directions: { screen: Directions },
    Key: { screen: EnterKey }
  },
  {
    initialRouteName: 'Map',
    contentOptions: {
      activeBackgroundColor: '#EDEDED',
      labelStyle: {fontSize: 16, fontWeight: 'normal', color: '#747474'}
    },
    contentComponent: props => <SideBar {...props} />
  }
)

export default Drawer;

AppRegistry.registerComponent('androidNavigator', () => Drawer);
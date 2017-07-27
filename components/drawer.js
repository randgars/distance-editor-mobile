import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native'
import MapComponent from './map'
import Directions from './directions'
import SideBar from './sidebar'

const Drawer = DrawerNavigator(
  {
    Map: { screen: MapComponent },
    Directions: { screen: Directions }
  },
  {
    initialRouteName: 'Map',
    contentOptions: {
      activeBackgroundColor: '#EDEDED',
      labelStyle: {fontSize: 17, fontWeight: 'normal'}
    },
    contentComponent: props => <SideBar {...props} />
  }
)

export default Drawer;

AppRegistry.registerComponent('androidNavigator', () => Drawer);
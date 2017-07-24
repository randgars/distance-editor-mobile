import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native'
import MapComponent from './map'
import Directions from './directions'
import SideBar from './sidebar'

const Drawer = DrawerNavigator(
  {
    MapComponent: { screen: MapComponent },
    Directions: { screen: Directions }
  },
  {
    initialRouteName: 'MapComponent',
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
)

export default Drawer;

AppRegistry.registerComponent('androidNavigator', () => Drawer);
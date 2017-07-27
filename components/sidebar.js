import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Button, Text, List, Icon, ListItem, Left, Body, Right } from 'native-base';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

const styles = {
  sidebar: {
    backgroundColor: '#fff',
  }
};

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.sidebar}>
          <DrawerItems {...this.props}/>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => SideBar);
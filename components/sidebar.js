import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Button, Text, List, ListItem, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigator  } from 'react-navigation';

const styles = {
  sidebar: {
    backgroundColor: '#fff',
  }
};

const menuList = [
  {
    route: 'MapComponent',
    icon: 'map',
    name: 'Map'
  },
  {
    route: 'Directions',
    icon: 'directions',
    name: 'Get directions'
  }  
]

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.sidebar}>
          <List
            dataArray={menuList}
            renderRow={(item, some, index) =>
							<ListItem key={index} button noBorder onPress={() => this.props.navigation.navigate(item.route)}>
								<Left>
									<Icon active name={item.icon} size={30} color="#900" />
									<Text>
										{item.name}
									</Text>
								</Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => SideBar);
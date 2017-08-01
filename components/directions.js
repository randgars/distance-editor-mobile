import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, StyleSheet, Dimensions, View } from 'react-native'
import {
  Container,
  Header,
  Title,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Content,
  Form,
  Item,
  Input,
  List,
  ListItem,
  Toast
} from 'native-base';
import WaypointInput from './waypointInput';
import MainPointInput from './mainPointInput';

const styles = {
  originPoint: {
    color: 'red'
  },
  destinationPoint: {
    color: 'blue'
  }
}
let iterator = 0;
export default class Directions extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Directions',
    drawerIcon: () => (
      <Icon name='navigate' />
    ),
  };
  constructor(props) {
    super(props);
    this.getDirection = this.getDirection.bind(this);
    this.addWaypointInput = this.addWaypointInput.bind(this);
  }
  addWaypointInput() {
    this.props.screenProps.actions.addWaypointInput(<WaypointInput apiKey={this.props.screenProps.apiKey} key={iterator} keyValue={iterator} actions={this.props.screenProps.actions} inputValue={this.props.screenProps.waypoints} />);
    iterator++;
  }
  getDirection() {
    if (this.props.screenProps.originPoint && (this.props.screenProps.destinationPoint || this.props.screenProps.waypoints.length > 0)) {
      this.props.screenProps.actions.getDistance(this.props.screenProps.originPoint, this.props.screenProps.waypoints, this.props.screenProps.destinationPoint, this.props.screenProps.apiKey);
      this.props.navigation.navigate('Map')
    } else {
      return Toast.show({
                text: 'Two or more points should be selected, including origin point!',
                position: 'bottom',
                buttonText: 'Okay'
              })
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Directions</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <MainPointInput inputValue={this.props.screenProps.originPoint} apiKey={this.props.screenProps.apiKey} currentLocation={this.props.screenProps.currentLocation} actions={this.props.screenProps.actions} inputPlaceholder='From' origin />
            {
              this.props.screenProps.waypointInputs
            }
            <Button transparent full onPress={this.addWaypointInput}>
              <Icon name='add' />
              <Text>Add waypoint</Text>
            </Button>
            <MainPointInput inputValue={this.props.screenProps.destinationPoint} apiKey={this.props.screenProps.apiKey} actions={this.props.screenProps.actions} inputPlaceholder='To' />
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={this.getDirection}>
              <Text>Go</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => Directions);
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
  ListItem,
  Toast,
  CheckBox
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
    this.state = {
      isChecked: false
    }
    this.getDirection = this.getDirection.bind(this);
    this.addWaypointInput = this.addWaypointInput.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }
  clearFields() {
    this.props.screenProps.actions.clearMainPoints();
    this.props.screenProps.actions.clearWaypoints();
  }
  isChecked() {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  addWaypointInput() {
    this.props.screenProps.actions.addWaypointInput(iterator);
    iterator++;
  }
  getDirection() {
    if (this.props.screenProps.originPoint && (this.props.screenProps.destinationPoint || this.props.screenProps.waypoints.length > 0)) {
      this.props.screenProps.actions.getDistance(this.props.screenProps.originPoint, this.props.screenProps.waypoints, this.props.screenProps.destinationPoint, this.props.screenProps.apiKey, this.state.isChecked);
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
              this.props.screenProps.waypointInputs.map((item) => (
                <WaypointInput apiKey={this.props.screenProps.apiKey} key={item} keyValue={item} actions={this.props.screenProps.actions} inputValue={this.props.screenProps.waypoints} />
              ))
            }
            <Button transparent full onPress={this.addWaypointInput}>
              <Icon name='add' />
              <Text>Add waypoint</Text>
            </Button>
            <MainPointInput inputValue={this.props.screenProps.destinationPoint} apiKey={this.props.screenProps.apiKey} actions={this.props.screenProps.actions} inputPlaceholder='To' />
          </Form>
          <ListItem>
            <CheckBox checked={this.state.isChecked} onPress={this.isChecked}/>
            <Body>
              <Text>Display the shortest route</Text>
            </Body>
          </ListItem>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.clearFields}>
              <Icon name='refresh' />
              <Text>Clear fields</Text>
            </Button>
            <Button onPress={this.getDirection}>
              <Icon name='done-all' />
              <Text>Go</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => Directions);
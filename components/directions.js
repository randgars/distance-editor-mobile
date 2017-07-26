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
  ListItem
} from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const styles = {
  originPoint: {
    color: 'red'
  },
  destinationPoint: {
    color: 'blue'
  }
}

export default class Directions extends React.Component {
  constructor(props) {
    super(props);
    this.addWaypointToList = this.addWaypointToList.bind(this);
    this.getDirection = this.getDirection.bind(this);
    this.addOriginToList = this.addOriginToList.bind(this);
    this.addDestinationToList = this.addDestinationToList.bind(this);
    this.addWaypointToList = this.addWaypointToList.bind(this);
  }
  addWaypointToList(data, details) {
    let waypoint = {
      address: details.formatted_address,
      location: details.geometry.location,
      placeID: details.place_id
    }
    this.props.screenProps.actions.setWaypoint(waypoint);
    this.waypointInput.refs.textInput.clear();
    this.waypointInput.state.text = '';
  }
  addOriginToList(data, details) {
    let originPoint = {
      address: details.formatted_address,
      location: details.geometry.location,
      placeID: details.place_id
    }
    this.props.screenProps.actions.setOriginPoint(originPoint);
  }
  addDestinationToList(data, details) {
    let destinationPoint = {
      address: details.formatted_address,
      location: details.geometry.location,
      placeID: details.place_id
    }
    this.props.screenProps.actions.setDestinationPoint(destinationPoint);
  }
  getDirection() {
    this.props.screenProps.actions.getDistance(this.props.screenProps.originPoint, this.props.screenProps.waypoints, this.props.screenProps.destinationPoint);
    this.props.navigation.navigate('MapComponent')
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
          <View>
            <GooglePlacesAutocomplete
              placeholder='From'
              minLength={2}
              autoFocus={false}
              listViewDisplayed='auto'
              fetchDetails={true}
              onPress={this.addOriginToList}
              getDefaultValue={() => {
                return '';
              }}
              query={{
                key: 'AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y',
                language: 'en',
                types: '(cities)',
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={200}
            />
            <GooglePlacesAutocomplete
              ref={ref => this.waypointInput = ref}
              placeholder='Add waypoints'
              minLength={2}
              autoFocus={false}
              listViewDisplayed='auto'
              fetchDetails={true}
              onPress={this.addWaypointToList}
              getDefaultValue={() => {
                return '';
              }}
              query={{
                key: 'AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y',
                language: 'en',
                types: '(cities)',
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={200}
            />
            <GooglePlacesAutocomplete
              placeholder='To'
              minLength={2}
              autoFocus={false}
              listViewDisplayed='auto'
              fetchDetails={true}
              onPress={this.addDestinationToList}
              getDefaultValue={() => {
                return '';
              }}
              query={{
                key: 'AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y',
                language: 'en',
                types: '(cities)',
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={200}
            />
          </View>
          <View>
          {
            this.props.screenProps.originPoint && <Text style={styles.originPoint}>{this.props.screenProps.originPoint.address}</Text>
          }
            <List
              dataArray={this.props.screenProps.waypoints}
              renderRow={(item, some, index) =>
                <ListItem key={index} button noBorder>
                  <Left>
                    <Text>
                      {item.address}
                    </Text>
                  </Left>
                </ListItem>}
            />
          {
            this.props.screenProps.destinationPoint && <Text style={styles.destinationPoint}>{this.props.screenProps.destinationPoint.address}</Text>
          }
          </View>
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
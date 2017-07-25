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

const data = [
  'dsfdsf',
  'dfdsf',
  'sdfdsf'
]

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

export default class Directions extends React.Component {
  constructor(props) {
    super(props);
    this.addWaypointToList = this.addWaypointToList.bind(this);
    this.getDirection = this.getDirection.bind(this);
  }
  addWaypointToList(data, details) {
    let waypointLocation = details.geometry.location;
    let wayPointAddress = details.formatted_address;
    let wayPointPlaceID = details.place_id;
    this.props.screenProps.actions.setWaypoint(wayPointAddress, waypointLocation, wayPointPlaceID);
    this.waypointInput.refs.textInput.clear();
    this.waypointInput.state.text = '';
  }
  getDirection() {
    this.props.screenProps.actions.getDistance(this.props.screenProps.waypoints);
  }
  componentDidUpdate() {
    debugger
    this.props.screenProps.pointLocations
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
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                console.log(data);
                console.log(details);
              }}
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
              currentLocation={true}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
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
              currentLocation={true}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
            <GooglePlacesAutocomplete
              placeholder='To'
              minLength={2}
              autoFocus={false}
              listViewDisplayed='auto'
              fetchDetails={true}
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                console.log(data);
                console.log(details);
              }}
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
              currentLocation={true}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
          </View>
          <View>
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
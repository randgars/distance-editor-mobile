import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, StyleSheet, Dimensions, Alert } from 'react-native'
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
  Toast
} from 'native-base';

const stylesSH = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

const styles = {
  container: {
    flex: 1
  }
};

export default class MapComponent extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Map',
    drawerIcon: () => (
      <Icon name='map' />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
    this.goToCurrentLocation = this.goToCurrentLocation.bind(this)
    this.clearRoutes = this.clearRoutes.bind(this)
    this.showRouteInfo = this.showRouteInfo.bind(this)
  }
  showRouteInfo() {
    let totalDistance = 0;
    let totalDuration = 0;
    for(let i = 0; i < this.props.screenProps.routeInfo.length; i++) {
      totalDistance += this.props.screenProps.routeInfo[i].distance;
      totalDuration += this.props.screenProps.routeInfo[i].duration;
    }
    totalDistance = totalDistance / 1000 ^ 0;
    totalDuration = totalDuration / 3600 ^ 0;
    Alert.alert(
      'Route info',
      `Distance: ${totalDistance} km \n Duartion: ${totalDuration} hs`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
  goToCurrentLocation() {
    this.map.animateToCoordinate(this.props.screenProps.currentLocation, 100);
  }
  clearRoutes() {
    this.props.screenProps.actions.clearWaypoints();
    this.props.screenProps.actions.clearMainPoints();
    this.props.screenProps.actions.clearRoute();
  }
  componentDidUpdate() {
    this.map.animateToCoordinate(this.props.screenProps.currentLocation, 100);
    if (this.props.screenProps.pointLocations.length > 0) {
      this.map.fitToCoordinates(this.props.screenProps.pointLocations, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false });
    }
    if (this.props.screenProps.routeError) {
      return Toast.show({
                text: this.props.screenProps.routeError,
                position: 'bottom',
                buttonText: 'Okay',
                type: 'danger'
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
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>
        <Content  style ={styles.container}>
          <MapView
            ref={ref => this.map = ref}
            style={stylesSH.map}
            showsCompass={true}
            showsScale={true}
            toolbarEnabled={true}
            loadingEnabled={true}
            region={this.state.region}
          >
            {
              this.props.screenProps.currentLocation &&
              <MapView.Marker
                coordinate={this.props.screenProps.currentLocation}
                title='Current location'
                description='Current location'
                pinColor='#FF0000'
              />
            }
            {
              this.props.screenProps.originPoint &&
              <MapView.Marker
                identifier='originPoint'
                coordinate={{latitude: this.props.screenProps.originPoint.location.lat, longitude: this.props.screenProps.originPoint.location.lng}}
                title='Origin point'
                pinColor='#00FF04'
                description={this.props.screenProps.originPoint.address}
              />
            }
            {
              this.props.screenProps.waypoints.map((waypoint, index) => (
                <MapView.Marker
                  identifier={`point${index}`}
                  key={index}
                  coordinate={{latitude: waypoint.waypoint.location.lat, longitude: waypoint.waypoint.location.lng}}
                  title={`${index+1} point`}
                  description={waypoint.waypoint.address}
                  pinColor='#7D00DC'
                />))
            }
            {
              this.props.screenProps.destinationPoint &&
              <MapView.Marker
                identifier='destinationPoint'
                coordinate={{latitude: this.props.screenProps.destinationPoint.location.lat, longitude: this.props.screenProps.destinationPoint.location.lng}}
                title='Destination point'
                pinColor='#00FFFF'
                description={this.props.screenProps.destinationPoint.address}
              />
            }
            {
              this.props.screenProps.pointLocations.length > 0 &&
              <MapView.Polyline
                coordinates={this.props.screenProps.pointLocations}
                strokeWidth={2}
                strokeColor={'#2874F0'}
              />
            }
          </MapView>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.goToCurrentLocation}>
              <Icon name="locate"/>
            </Button>
            {
              this.props.screenProps.pointLocations.length > 0 &&
              <Button onPress={this.clearRoutes}>
                <Icon name="refresh"/>
              </Button>
            }
            {
              this.props.screenProps.pointLocations.length > 0 &&
              <Button onPress={this.showRouteInfo}>
                <Icon name="information"/>
              </Button>
            }
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => MapComponent);
import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, StyleSheet, Dimensions } from 'react-native'
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
  Content } from 'native-base';

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
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.goToCurrentLocation = this.goToCurrentLocation.bind(this)
    this.clearRoutes = this.clearRoutes.bind(this)
  }
  onRegionChangeComplete(coords) {
    // this.setState({
    //   region: {
    //     latitude: coords.latitude,
    //     longitude: coords.longitude,
    //     latitudeDelta: coords.latitudeDelta,
    //     longitudeDelta: coords.longitudeDelta,
    //   }
    // })
  }
  goToCurrentLocation() {
    this.map.animateToCoordinate(this.props.screenProps.currentLocation, 100);
  }
  clearRoutes() {
    this.props.screenProps.actions.clearWaypoints();
    this.props.screenProps.actions.clearMainPoints();
  }
  componentDidMount() {
    this.props.screenProps.actions.getCurrentLocation();
  }
  componentDidUpdate() {
    this.map.animateToCoordinate(this.props.screenProps.currentLocation, 100);
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
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {
              this.props.screenProps.originPoint &&
              <MapView.Marker
                identifier='pointA'
                pinColor='red'
                coordinate={{latitude: this.props.screenProps.originPoint.location.lat, longitude: this.props.screenProps.originPoint.location.lng}}
                title='A'
                description='Point A'
              />
            }
            {
              this.props.screenProps.destinationPoint &&
              <MapView.Marker
                identifier='pointB'
                pinColor='blue'
                coordinate={{latitude: this.props.screenProps.destinationPoint.location.lat, longitude: this.props.screenProps.destinationPoint.location.lng}}
                title='B'
                description='Point B'
              />
            }
            {
              this.props.screenProps.waypoints.map((waipoint, index) => (
                <MapView.Marker
                  identifier={`point${index}`}
                  key={index}
                  pinColor='green'
                  coordinate={{latitude: waipoint.location.lat, longitude: waipoint.location.lng}}
                  title={`${index+1}`}
                  description={`Point ${index+1}`}
                />))
            }
            {
              this.props.screenProps.pointLocations &&
              <MapView.Polyline
                coordinates={this.props.screenProps.pointLocations}
                strokeWidth={2}
                strokeColor={'#5D00FF'}
              />
            }
          </MapView>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.goToCurrentLocation}>
              <Icon name="locate"/>
            </Button>
            <Button onPress={this.clearRoutes}>
              <Icon name="refresh"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => MapComponent);
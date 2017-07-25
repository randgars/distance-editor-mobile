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
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
  }
  onRegionChangeComplete(value) {
    debugger
  }
  onMapReady(value) {
    debugger
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
            style={stylesSH.map}
            showsCompass={true}
            showsScale={true}
            toolbarEnabled={true}
            loadingEnabled={true}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
          }}>
            { this.props.screenProps.waypoints.map((waipoint, index) => (
                <MapView.Marker
                  key={index}
                  pinColor='red'
                  coordinate={{latitude: waipoint.location.lat, longitude: waipoint.location.lng}}
                  title={`${index+1}`}
                  description={`${index+1} point`}
                />)
            )}
            { this.props.screenProps.pointLocations &&
              <MapView.Polyline
                coordinates={this.props.screenProps.pointLocations.map(item => ({latitude: item.lat, longitude: item.lng}))}
              />
            }
          </MapView>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => MapComponent);
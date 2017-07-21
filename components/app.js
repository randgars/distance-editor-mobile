import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, View, StyleSheet, Dimensions } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

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

export default class App extends React.Component {
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
  
  // componentDidMount() {
  //   fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Chicago,IL&destination=Los+Angeles,CA&waypoints=Joplin,MO|Oklahoma+City,OK&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y')
  //   .then(function (response) {
  //       return response.json()
  //   })
  //   .then(function (responseJson) {
  //     console.log(responseJson)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
  // }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
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
              longitudeDelta: 0.0421,
            }}/>
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

AppRegistry.registerComponent('androidNavigator', () => App);
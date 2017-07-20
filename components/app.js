import React from 'react';
import MapView from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Chicago,IL&destination=Los+Angeles,CA&waypoints=Joplin,MO|Oklahoma+City,OK&key=AIzaSyAOMnmhinhboANYfzfyTqhlQqezl1Jj83Y')
    .then(function (response) {
        return response.json()
    })
    .then(function (responseJson) {
      console.log(responseJson)
    })
    .catch(function (error) {
      console.log(error)
    })

  }
  render() {
    return (
      <View style ={styles.container}>
        <MapView
          liteMode={true}
          showsScale={true}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
      </View>
    );
  }
}
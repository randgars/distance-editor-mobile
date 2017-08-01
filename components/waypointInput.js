import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, View, TouchableNativeFeedback } from 'react-native'
import {
  Button,
  Icon,
  Text,
  Item,
  Input,
  List,
  ListItem,
} from 'native-base';

export default class WaypointInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      places: [],
      toggleList: true,
      point: null
    }
    this.addWaypointToList = this.addWaypointToList.bind(this);   
    this.deleteWaypointInput = this.deleteWaypointInput.bind(this);   
    this.onChangeText = this.onChangeText.bind(this);   
    this.getPlaces = this.getPlaces.bind(this);
    this.setPlace = this.setPlace.bind(this);
    this.getPointLocation = this.getPointLocation.bind(this);
  }
  getPlaces() {
    fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${this.props.apiKey}&input=${this.state.inputValue}`).then(
      response => {
        return response.json()
      },
      error => {
        return console.log(error)
      }
    )
    .then(
      responseJson => {
        this.setState({
          places: responseJson.predictions
        })
      },
      error => {
        return console.log(error)
      }
    )
    .catch(error => {
      console.log(error)
    })
  }
  setPlace(value) {
    this.setState({
      inputValue: value.description,
      toggleList: false,
      places: []
    })
    this.getPointLocation(value)
  }
  getPointLocation(value) {
    let address = value.description.replace(/,\s/g, ',');
    address = address.replace(/\s/g, '+');
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.props.apiKey}`).then(
      response => {
        return response.json()
      },
      error => {
        return console.log(error)
      }
    )
    .then(
      responseJson => {
        let point = {
          address: responseJson.results[0].formatted_address,
          location: responseJson.results[0].geometry.location,
          place_id: responseJson.results[0].place_id
        }
        this.addWaypointToList(point)
      },
      error => {
        return console.log(error)
      }
    )
    .catch(error => {
      console.log(error)
    })
  }
  onChangeText(value) {
    this.setState({
      inputValue: value
    })
    if (this.state.toggleList) {
      this.getPlaces();
    } else {
      this.setState({
        toggleList: true
      })
    }
  }
  addWaypointToList(point) {
    this.setState({
      point: point
    })
    this.props.actions.setWaypoint(this.props.keyValue, point);
  }
  deleteWaypointInput() {
    this.props.actions.deleteWaypointInput(this.props.keyValue, this.state.point);
  }
  componentDidMount() {
    if (this.props.inputValue) {
      for (let i = 0; i < this.props.inputValue.length; i++) {
        if (this.props.inputValue[i].keyValue == this.props.keyValue) {
          this.setState({
            inputValue: this.props.inputValue[i].waypoint.address
          })
        }
      }
      
    }
  }
  render() {
    return (
      <View>
        <Item inlineLabel>
          <Input placeholder='waypoint' value={this.state.inputValue} selectionColor='#747474' onChangeText={this.onChangeText}/>
          <Button transparent onPress={this.deleteWaypointInput}>
            <Icon name='close' />
          </Button>
        </Item>
        {
          this.state.toggleList &&
          <View>
            {this.state.places.map((item, index) => (
              <Button transparent full key={index} onPress={this.setPlace.bind(this, {description: item.description, place_id: item.place_id})}>
                <Text>{item.description}</Text>
              </Button>
            ))}
          </View>
        }
      </View>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => WaypointInput);
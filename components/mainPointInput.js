import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, View } from 'react-native'
import {
  Button,
  Icon,
  Text,
  Item,
  Input,
  List,
  ListItem,
} from 'native-base';

export default class MainPointInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      places: [],
      toggleList: true
    }
    this.addPointToList = this.addPointToList.bind(this);   
    this.onChangeText = this.onChangeText.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.setPlace = this.setPlace.bind(this);
    this.getPointLocation = this.getPointLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  getLocation() {
    let latlng = this.props.currentLocation.latitude + ',' + this.props.currentLocation.longitude;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${this.props.apiKey}`).then(
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
          inputValue: responseJson.results[0].formatted_address
        })
        let point = {
          address: responseJson.results[0].formatted_address,
          location: responseJson.results[0].geometry.location,
          place_id: responseJson.results[0].place_id
        }
        this.addPointToList(point)
      },
      error => {
        return console.log(error)
      }
    )
    .catch(error => {
      console.log(error)
    })
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
        this.addPointToList(point)
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
  addPointToList(point) {
    if (this.props.origin) {
      this.props.actions.setOriginPoint(point);
    } else {
      this.props.actions.setDestinationPoint(point);
    } 
  }
  componentDidMount() {
    if (this.props.inputValue) {
      this.setState({
        inputValue: this.props.inputValue.address
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.inputValue && !this.props.inputValue) {
      this.setState({
        inputValue: null
      })
    }
  }
  render() {
    return (
      <View>
        <Item inlineLabel>
        	<Input ref={ref => this.input = ref} value={this.state.inputValue} placeholder={this.props.inputPlaceholder} selectionColor='#747474' onChangeText={this.onChangeText}/>
          {
            this.props.origin &&
            <Button transparent onPress={this.getLocation}>
              <Icon name='locate' />
            </Button>
          }
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

AppRegistry.registerComponent('androidNavigator', () => MainPointInput);
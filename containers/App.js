import React from 'react'
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import {
  setWaypoint,
  getDistance,
  getCurrentLocation,
  setOriginPoint,
  setDestinationPoint,
  clearMainPoints,
  clearWaypoints,
  addWaypointInput,
  deleteWaypointInput,
  setApiKey,
  getApiKey
} from '../actions'
import Main from '../components/app'

import {
  AppRegistry
} from 'react-native';
class App extends React.Component {
  componentDidMount() {
    this.props.actions.getApiKey();
    this.props.actions.getCurrentLocation(this.props.apiKey);
  }
  render() {
    return (
      <Main {...this.props}/>
    );
  }
}

function mapStateToProps (state) {
  const props = {
    waypoints: state.waypointsReducer.waypoints,
    pointLocations: state.waypointsReducer.pointLocations,
    currentLocation: state.locationReducer.currentLocation,
    originPoint: state.mainPointsReducer.originPoint,
    destinationPoint: state.mainPointsReducer.destinationPoint,
    waypointInputs: state.waypointsReducer.waypointInputs,
    apiKey: state.apiKeyReducer.apiKey,
    isChangedKey: state.apiKeyReducer.isChangedKey
  };
  return props;
}

function mapDispatchToProps (dispatch) {
  const actions = {
    setWaypoint,
    setOriginPoint,
    setDestinationPoint,
    clearMainPoints,
    clearWaypoints,
    getCurrentLocation,
    getDistance,
    addWaypointInput,
    deleteWaypointInput,
    setApiKey,
    getApiKey
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

AppRegistry.registerComponent('androidNavigator', () => App);
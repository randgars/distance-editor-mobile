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
  clearWaypoints
} from '../actions'
import Main from '../components/app'

import {
  AppRegistry
} from 'react-native';
class App extends React.Component {
  componentDidMount() {
    this.props.actions.getCurrentLocation();
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
    destinationPoint: state.mainPointsReducer.destinationPoint
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
    getDistance
  };
  let actionMap = { actions: bindActionCreators(actions, dispatch) };
  const handlers = {
  };
  actionMap.actions = Object.assign({}, actionMap.actions, handlers);

  return actionMap;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

AppRegistry.registerComponent('androidNavigator', () => App);
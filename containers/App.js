import React from 'react'
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import {
  setWaypoint,
  getDistance
} from '../actions'
import Main from '../components/app'

import {
  AppRegistry
} from 'react-native';
class App extends React.Component {
  render() {
    return (
      <Main {...this.props}/>
    );
  }
}

function mapStateToProps (state) {
  const props = {
    waypoints: state.waypointsReducer.waypoints,
    pointLocations: state.waypointsReducer.pointLocations
  };
  return props;
}

function mapDispatchToProps (dispatch) {
  const actions = {
    setWaypoint,
    getDistance
  };
  let actionMap = { actions: bindActionCreators(actions, dispatch) };
  const handlers = {
    getDistance: getDistance.bind(this, dispatch)
  };
  actionMap.actions = Object.assign({}, actionMap.actions, handlers);

  return actionMap;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

AppRegistry.registerComponent('androidNavigator', () => App);
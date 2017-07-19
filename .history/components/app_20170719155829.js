import React from 'react'
import { Text } from 'react-native'
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import {  } from './actions'

let styles

const App = (props) => {
 
  return (
    <Text>fuck yeah</Text>
  )
}

styles = StyleSheet.create({
  
})

function mapStateToProps (state) {
  const props = {

  };
  return props;
}

function mapDispatchToProps (dispatch) {
  const actions = {

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
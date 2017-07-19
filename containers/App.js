import React from 'react'
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import {  } from '../actions'
import Main from '../components/app'

class App extends React.Component {
  render() {
    return (
      <Main {...this.props}/>
    );
  }
}

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
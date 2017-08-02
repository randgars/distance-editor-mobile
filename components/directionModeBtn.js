import React from 'react';
import { AppRegistry } from 'react-native'
import {
  Button,
  Icon
} from 'native-base';

export default class DirectionModeBtn extends React.Component {
  constructor(props) {
    super(props);
    this.selectedMode = this.selectedMode.bind(this)
  }
  selectedMode() {
    this.props.actions.selectedMode(this.props.mode)
  }

  render() {
    return (
      <Button light={this.props.directionMode !== this.props.mode} primary={true} onPress={this.selectedMode}>
        <Icon name={this.props.icoName}/>
      </Button>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => DirectionModeBtn);
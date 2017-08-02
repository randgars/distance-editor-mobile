import React from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Content } from 'native-base';
import { DrawerItems } from 'react-navigation';

const styles = {
  sidebar: {
    backgroundColor: '#fff',
  }
};
const stylesSH = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 100,
    height: 150
  }
});

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.sidebar}>
          <Image 
            style={stylesSH.image}
            resizeMode={'cover'}
            source={require('../images/bg.png')} />
          <DrawerItems {...this.props}/>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => SideBar);
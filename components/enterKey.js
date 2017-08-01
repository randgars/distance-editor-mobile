import React from 'react';
import { AppRegistry } from 'react-native'
import {
  Container,
  Header,
  Title,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Content,
  Item,
  Input,
  Toast
} from 'native-base';

const styles = {
  container: {
    flex: 1
  }
};

export default class EnterKey extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Key',
    drawerIcon: () => (
      <Icon name='key' />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      apiKeyValue: null
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.changeApiKey = this.changeApiKey.bind(this);
  }
  onChangeText(value) {
    this.setState({
      inputValue: value
    })
  }
  changeApiKey() {
    if (!this.state.inputValue || this.state.inputValue.length < 1) {
      return Toast.show({
                text: 'Your key wasn\'t added!',
                position: 'bottom',
                buttonText: 'Okay',
                type: 'warning'
              })
    }
    this.props.screenProps.actions.setApiKey(this.state.inputValue);
    this.props.screenProps.actions.getApiKey();
    return Toast.show({
                text: 'Your key was successfully added!',
                position: 'bottom',
                buttonText: 'Okay',
                type: 'success'
              })
  }
  componentDidMount() {
    if (this.props.screenProps.isChangedKey) {
      this.setState({
        apiKeyValue: this.props.screenProps.apiKey
      })
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Key</Title>
          </Body>
          <Right />
        </Header>
        <Content  style ={styles.container}>
            <Item inlineLabel>
              <Input defaultValue={this.state.apiKeyValue} onChangeText={this.onChangeText} placeholder='Enter your key' selectionColor='#747474'/>
            </Item>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.changeApiKey}>
              <Text>Done</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('androidNavigator', () => EnterKey);
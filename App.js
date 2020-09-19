import React, {Component} from 'react';
import {Alert, Button, TextInput, View, StyleSheet} from 'react-native';
import base64 from 'react-native-base64';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }

  async Login() {
    var loginId = base64.encode(
      this.state.username + ':' + this.state.password,
    );

    let loginUser = await axios
      .get('<API>', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + loginId,
        },
      })
      .then((responseData) => {
        console.log(responseData.data);
        Alert.alert(
          'Welcome ' + `${this.state.username}`,
          'Basic login complete',
        );
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
        Alert.alert('Authentication Error', 'Please try again');
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          placeholder={'Username'}
          placeholderTextColor="white"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder={'Password'}
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          color="grey"
          style={styles.input}
          onPress={this.Login.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    color: '#ccff00',
  },
});

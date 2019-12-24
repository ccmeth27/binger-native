import React from 'react'
import { SafeAreaView, Button, StyleSheet, TouchableOpacity } from 'react-native'
import InputField from '../components/InputField'


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
      username: '',
      password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let usernameInput = this.state.username
    let passwordInput = this.state.password
    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput
      })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if(data.errors){
            alert(data.errors)
          }
        else { 
            this.props.navigation.setParams({
                user: data.user,
                token: data.token,
            });
            this.props.navigation.navigate('Main', {
              user: data.user,
              token: data.token,
            });
        }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <SafeAreaView>
        <InputField 
            name="username" 
            labelText="USERNAME" 
            inputType="username" 
            borderBottomColor={'black'}
            onChangeText={(text) => {this.setState({username: text})}} 
            />
        <InputField 
            name="password" 
            labelText="PASSWORD" 
            inputType="password" 
            borderBottomColor={'black'}
            onChangeText={(text) => {this.setState({password: text})}} 
            />
        <TouchableOpacity style={styles.buttonBorder}>
            <Button style={styles.submitButton} title="Sign In" onPress={this.handleSubmit} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


}

const styles = StyleSheet.create({
    submitButton: {
      paddingTop: 40,
    },
    buttonBorder: {
      padding: 20,
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: 'white',
      backgroundColor: 'grey',
      width: 150,
      alignSelf: 'center',
      justifyContent: 'center'
      
    }
  });
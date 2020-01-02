import React from 'react'
import { SafeAreaView, View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'
import InputField from '../components/InputField'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { Button } from 'react-native-elements'

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
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if(data.errors){
            alert(data.errors)
          }
        else { 
            this.props.navigation.navigate({ 
                routeName: 'Home', 
                params: {
                    token: data.token,
                    user_id: data.user.id,
                    username: data.user.username,
                }
            });
        }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backButtonContainer}>
          <Button
            type="clear"
            style={styles.backButton}
            title="◀︎ back"
            color="white"
            onPress={() => this.props.navigation.goBack()}
            />
          </View>
        <Text style={styles.loginHeader}>Log In</Text>
        <InputField 
            name="username" 
            labelText="USERNAME" 
            inputType="username" 
            borderBottomColor={'white'}
            onChangeText={(text) => {this.setState({username: text})}} 
        />
        <InputField 
            name="password" 
            labelText="PASSWORD" 
            inputType="password" 
            borderBottomColor={'white'}
            onChangeText={(text) => {this.setState({password: text})}} 
        />
        <TouchableOpacity style={styles.buttonBorder}>
            <Button style={styles.submitButton} color="white" title="Sign In" onPress={this.handleSubmit} />
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
      padding: 10,
      marginTop: 20,
      borderWidth: 0,
      borderRadius: 25,
      borderColor: 'white',
      backgroundColor: '#20DB3A',
      width: 150,
      alignSelf: 'center',
      justifyContent: 'center'
      
    },
    loginHeader: {
      fontSize: 28,
      color: 'white',
      fontWeight: "bold",
      marginBottom: 50,
      top: 30,
      alignSelf: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: '#121212'
    },
    backButton: {
      height: 60,
      width: 60,
      top:-10,
    },
    backButtonContainer: {
      alignItems: 'flex-start',
      paddingBottom: 30,
      paddingLeft: 20,
    }
    
  });
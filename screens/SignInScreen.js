import React from 'react'
import { SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import InputField from '../components/InputField'
import Icon from 'react-native-vector-icons/FontAwesome'

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
            title="🔙"
            onPress={() => this.props.navigation.goBack()}
            // icon={
            //   <Icon 
            //     name="back-arrow"
            //     size={30}
            //     color="black"
            //     />
            // }
            />
          </View>
        <Text style={styles.loginHeader}>Log In</Text>
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
      
    },
    loginHeader: {
      fontSize: 28,
      color: 'black',
      fontWeight: "bold",
      marginBottom: 50,
      top: 20,
      alignSelf: 'center'
    },
    container: {
      marginTop: 100,
      
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
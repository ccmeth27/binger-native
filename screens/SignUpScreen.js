import React from 'react'
import { SafeAreaView, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
import InputField from '../components/InputField'


export default class SignUpScreen extends React.Component {
    static navigationOptions = {
      title: 'Create an Account',
    };
  
    state = {
      username: '',
      password: '',
      password_confirmation: ''
    }

    handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.password === this.state.password_confirmation)
        fetch('http://localhost:3001/api/v1/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          }),
        })
        .then(resp => resp.json())
        .then(response => {
          console.log(response)
          if(response.errors){
            alert(response.errors)
          } 
          else {
            this.props.navigation.navigate({ 
              routeName: 'Home', 
              params: {
                  token: response.token,
                  user_id: response.user.id,
                  username: response.user.username,
              }
          });
          }
        })
        .catch((error) => {
          console.log(error);
        })
      else {
        alert('Passwords do not match!')
      }
    }
     

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.registerHeader}>Sign Up</Text>
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
            <InputField 
            name="confirm_password" 
            labelText="CONFIRM PASSWORD" 
            inputType="password"
             
            borderBottomColor={'black'}
            onChangeText={(text) => {this.setState({password_confirmation: text})}}
            />
          <TouchableOpacity style={styles.buttonBorder}>
            <Button style={styles.submitButton} title="Create Account!" onPress={this.handleSubmit} />
          </TouchableOpacity>
          <Text style={styles.text} > or if you already have an account:</Text>
          <TouchableOpacity style={styles.buttonBorder}>
            <Button style={styles.submitButton} title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')}/>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  
   
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      alignSelf: 'center',
      marginHorizontal: 20,
      marginVertical: 20,
    },
    container: {
      marginTop: 100,
      
    },
    registerHeader: {
      fontSize: 28,
      color: 'black',
      fontWeight: "bold",
      marginBottom: 50,
      top: 20,
      alignSelf: 'center'
    },
    submitButton: {
      paddingTop: 20,
    },
    buttonBorder: {
      padding: 20,
      // bottom: 60,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: 'white',
      backgroundColor: 'grey',
      width: 200,
      alignSelf: 'center',
      justifyContent: 'flex-end'
      
    }
  });
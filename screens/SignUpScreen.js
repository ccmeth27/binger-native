import React from 'react'
import { SafeAreaView, View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
              routeName: 'Subscriptions', 
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
          <View style={styles.continueButton}>
            <Button 
              title="Continue ▷" 
              color="black" 
              onPress={this.handleSubmit} />
          </View>
          <Text style={styles.text} > Already have an account? Click below to Sign In:</Text>
          <View style={styles.signInButton}>
            <Button 
              title="Sign In" 
              type="clear" 
              color="black" 
              onPress={() => this.props.navigation.navigate('SignIn')}/>
          </View>
        </SafeAreaView>
      );
    }
  
   
  }

  const styles = StyleSheet.create({
    text: {
      width: 250,
      fontSize: 20,
      alignSelf: 'center',
      marginHorizontal: 20,
      marginVertical: 20,
      marginTop: 40,
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
    continueButton: {
      padding: 10,
      marginTop: 30,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: 'black',
      backgroundColor: 'green',
      width: 200,
      alignSelf: 'center',
      justifyContent: 'flex-end'
    },
    signInButton: {
      padding: 10,
      marginTop: 30,
      // borderWidth: 1,
      borderRadius: 25,
      // borderColor: 'black',
      backgroundColor: 'blue',
      width: 200,
      alignSelf: 'center',
      justifyContent: 'flex-end'
    }
  });
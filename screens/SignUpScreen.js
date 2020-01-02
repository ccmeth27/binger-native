import React from 'react'
import { SafeAreaView, Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import InputField from '../components/InputField'
// import { Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'



export default class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
  }
  
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
          <Image 
            source={require('../assets/images/binger.png')}
            style={styles.logo}/>
          <Text style={styles.registerHeader}>Sign Up</Text>
          <InputField 
            name="username" 
            labelText="USERNAME" 
            inputType="username" 
            textColor="white"
            borderBottomColor={'white'}
            onChangeText={(text) => {this.setState({username: text})}} 
            />
            <InputField 
            name="password" 
            labelText="PASSWORD" 
            inputType="password" 
            color="white"
            borderBottomColor={'white'}
            onChangeText={(text) => {this.setState({password: text})}} 
            />
            <InputField 
            name="confirm_password" 
            labelText="CONFIRM PASSWORD" 
            inputType="password"
            color="white"
            borderBottomColor={'white'}
            onChangeText={(text) => {this.setState({password_confirmation: text})}}
            />
          <View style={styles.continueButton}>
            <Button 
              title="Continue" 
              color="white" 
              onPress={this.handleSubmit}
            />
          </View>
          <Text style={styles.text} > Already have an account? Click below to Sign In:</Text>
          <View style={styles.signInButton}>
            <Button 
              title="Sign In" 
              color="white" 
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
      marginTop: 20,
      color: 'white'
    },
    container: {
      flex: 1,
      marginTop: 100,
      backgroundColor: '#121212',
    },
    registerHeader: {
      fontSize: 22,
      color: 'white',
      fontWeight: "bold",
      marginTop: 30,
      alignSelf: 'center'
    },
    continueButton: {
      padding: 10,
      fontWeight: 'bold',
      marginTop: 30,
      borderRadius: 25,
      backgroundColor: '#20DB3A',
      width: 200,
      alignSelf: 'center',
      justifyContent: 'flex-end'
    },
    signInButton: {
      padding: 10,
      marginTop: 10,
      borderRadius: 25,
      backgroundColor: '#0097FA',
      width: 200,
      alignSelf: 'center',
      justifyContent: 'flex-end'
    },
    logo: { 
      width: 200, 
      height: 100,
      alignSelf: 'center',
      marginTop: 10,
    }
  });
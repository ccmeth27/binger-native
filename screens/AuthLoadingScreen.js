import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.getUserToken();
  }

  // Fetch the token from storage then navigate to our appropriate place
  getUserToken = async () => {
    

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
    }
})
import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation';

class ProfileScreen extends React.Component {
  
  componentDidMount = () => {

  }
  render () {
    console.log(this.props.navigation)
    const username = this.props.navigation.state.params.username
    return (
      <SafeAreaView>
        
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.categoryText}>Recently Watched</Text>
        <Text style={styles.categoryText}>Re</Text>
      </SafeAreaView>
    )
  }
  
}

export default ProfileScreen

const styles = StyleSheet.create({
  usernameText: {
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center',
    color: 'white',
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
    color: 'white',
  }
})
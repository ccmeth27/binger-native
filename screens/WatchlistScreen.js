import React from 'react'
import { Text, SafeAreaView } from 'react-native'

class WatchlistScreen extends React.Component {
  
  
  componentDidMount = () => {
    // const userID = this.props.navigation.state.params.user_id
    // console.log(userID)
  }
  render() {
    return (
      <SafeAreaView>
        <Text>Watchlist Screen</Text>
      </SafeAreaView>
    )
  }
}

export default WatchlistScreen
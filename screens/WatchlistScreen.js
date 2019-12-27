import React from 'react'
import { Text, SafeAreaView } from 'react-native'

class WatchlistScreen extends React.Component {
  
  
  getUserWatchlist = () => {
    const userID = this.props.navigation.state.params.user_id
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
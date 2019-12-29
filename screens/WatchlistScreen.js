import React from 'react'
import { Text, SafeAreaView, Image, View, StyleSheet, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class WatchlistScreen extends React.Component {
  
  state = {
    allUserPrograms: [],
    isLoading: true,
  }
  componentDidMount = () => {
    this.fetchWatchlist()
  }
  
  fetchWatchlist = () => {
    const userID = this.props.navigation.state.params.user_id
    fetch(`http://localhost:3001/api/v1/user_programs/${userID}`)
    .then(resp => resp.json())
    .then(userPrograms => {
      // this.renderPrograms(userPrograms)
      this.setState({
        allUserPrograms: userPrograms,
        isLoading: false
      })
    })
    
  }

  // renderPrograms = () => {
  //   this.state.allUserPrograms.filter(program => program.is_watchlist === '1').map(program => {
  //     return (
  //       <Card title="CARD WITH DIVIDER">
  //             <View>
  //               <Image
  //                 style={styles.image}
  //                 resizeMode="cover"
  //                 source={{ uri: program.Poster }}
  //               />
  //               <Text style={styles.title}>{program.Title}</Text>
  //             </View>
  //       </Card>
  //       )
  //   })
  // }

  render() {
    
      return (
        <SafeAreaView>
          <ScrollView>
          <Text>Watchlist Screen</Text>
          {this.state.isLoading ?
          <View>
            <Text>Loading...</Text>
          </View>
          :
          this.state.allUserPrograms.map(program => 
            <Card title="CARD WITH DIVIDER">
              <View>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: program.Poster }}
                />
                <Text style={styles.title}>{program.Title}</Text>
              </View>
            </Card>
          
          )}
          </ScrollView>
        </SafeAreaView>
      )
  }
}

export default WatchlistScreen

const styles = StyleSheet.create({
  imageCard: {
    height: 50,
    width: 35,
  },
  title: {
    fontWeight: 'bold'
  }
})
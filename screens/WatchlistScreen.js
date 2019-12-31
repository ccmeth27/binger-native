import React from 'react'
import { 
  ActivityIndicator, 
  FlatList, 
  Text, 
  SafeAreaView, 
  Image, 
  View, 
  StyleSheet
} from 'react-native'
import ToggleSwitch from '../components/ToggleSwitch'
import Layout from '../constants/Layout'
import { Tile } from 'react-native-elements'

class WatchlistScreen extends React.Component {
  
  state = {
    allUserPrograms: [],
    loading: true,
    programType: 'movie',
    switch1Value: false,
    modalVisible: false,
    programInfo: [],
    moreInfoPoster: '../assets/images/what.gif',
    imdbRating: 'N/A',
    tomatoesRating: 'N/A'
  }
  componentDidMount = () => {
    this.fetchUserWatchlist()
  }
  
  fetchUserWatchlist = () => {
    const user_id = this.props.navigation.state.params.user_id
    let type = this.state.programType
    fetch(`http://localhost:3001/api/v1/${type}_watchlist/${user_id}`)
    .then(resp => resp.json())
    .then(userPrograms => {
      console.log(userPrograms.user_programs)
      this.setState({
        allUserPrograms: userPrograms.user_programs,
        loading: false
      })
    })
    
  }

  toggleSwitch1 = (value) => {
    console.log('Switch is: ', value)
    switch (value) {
        case true:
            this.setState({
                allUserPrograms: [],
                programType: 'series',
                switch1Value: value,
                loading: true,
                tomatoesRating: 'N/A'
                },
                this.fetchUserWatchlist
            )
            break;
        case false:
            this.setState({
                allUserPrograms: [], 
                programType: 'movie',
                switch1Value: value,
                loading: true
                },
                this.fetchUserWatchlist
            )
            break;
    }
}

  renderItem = (item) => {
    console.log(item)
    return (
        <Tile
          key={item.id}
          onPress={({item}) => console.log(item)}
          iconContainerStyle={styles.icon}
          imageSrc={{ uri: item.poster}}
          imageContainerStyle={styles.posterImage}
          activeOpacity={0.9}
          caption={item.title}
          captionStyle={styles.caption}
          containerStyle={styles.tileContainer}
          contentContainerStyle={{width: 200}}
          overlayContainerStyle={styles.overlay}
          featured
          /> 
    )
  }

  render() {
    const userID = this.props.navigation.state.params.user_id
    console.log(userID)
      return (
        <SafeAreaView style={{ flex: 1}} >
            <Text style={styles.header}>Watchlist</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.toggleText} >Movies</Text>
                <ToggleSwitch
                    toggleSwitch1={this.toggleSwitch1}
                    switch1Value={this.state.switch1Value}/>
                <Text style={styles.toggleText} >Shows</Text>
            </View>
            {this.state.loading ?
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff"/>
            </View>
            :
            <View style={styles.flatlistContainer}>
              <FlatList
                  data={this.state.allUserPrograms}
                  renderItem={({ item }) => this.renderItem(item)}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  on
              />
            </View>
            }
          
        </SafeAreaView>
      )
  }
}

export default WatchlistScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  posterImage: {
    width: 175,
    height: 250,
  },
  tileContainer: {
    width: 175,
    height: 285,
    margin: 10,
    marginBottom: 5
  },
  flatlistContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  caption: {
    justifyContent: 'flex-start',
    color: 'white',
    fontSize: 12,
    top: 130,
  },
  switchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  toggleText: {
    color: 'white',
    padding: 5,
    fontSize: 16,
},
})
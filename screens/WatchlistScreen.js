import React from 'react'
import { 
  ActivityIndicator, 
  FlatList, 
  Text, 
  SafeAreaView, 
  Image, 
  View, 
  StyleSheet,
  ScrollView,
  RefreshControl,
  Modal
} from 'react-native'
import ToggleSwitch from '../components/ToggleSwitch'
import Layout from '../constants/Layout'
import { Tile, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class WatchlistScreen extends React.Component {
  
  state = {
    allUserPrograms: [],
    loading: true,
    programType: 'movie',
    switch1Value: false,
    modalVisible: false,
    modal2Visible: false,
    programInfo: [],
    moreInfoPoster: '../assets/images/what.gif',
    releaseYear: '',
    imdbRating: 'N/A',
    tomatoesRating: 'N/A',
    imdbID: '',
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
        guideboxID: userPrograms.guidebox_id,
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
      <View>
        <Tile
          key={item.id}
          onPress={() => console.log(item)}
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
          <View style={styles.editContainer}>
            <Button
              type="clear"
              style={styles.editButton}
              onPress={() => this.openWatchlistModal(item)}
              icon={
              <Icon
                  name="ellipsis-v"
                  size={40}
                  color="white"
              />
              }
          />
          </View> 
      </View>
    )
  }

  openWatchlistModal = (item) => {
    let imdb = item.imdb_id
    console.log(item)
    fetch(`http://www.omdbapi.com/?i=${imdb}&apikey=6743b2b0`)
    .then(resp => resp.json())
    .then(programData => {
        console.log(programData)
        if (this.state.programType === 'movie') {
            this.setState({
                modal2Visible: true,
                programInfo: programData,
                moreInfoPoster: programData.Poster,
                imdbRating: programData.Ratings[0].Value, 
                tomatoesRating: programData.Ratings[1].Value, 
                imdbID: imdb,
                
            })
        }else{
            this.setState({
                modal2Visible: true,
                programInfo: programData,
                moreInfoPoster: programData.Poster,
                imdbRating: 'N/A', 
                tomatoesRating: 'N/A',
                imdbID: imdb,
            })
          }
      })
  }

  addToSeenList = () => {
    const userID = this.props.navigation.state.params.user_id
    fetch(`http://localhost:3001/api/v1/watched_program/${userID}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        imdb_id: this.state.imdbID,
        is_seen: true,
        is_watchlist: false,
      })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
    .catch((error) => {
      console.log(error);
    })
  
  }
  addToRejectedList = () => {
    const userID = this.props.navigation.state.params.user_id
    fetch(`http://localhost:3001/api/v1/remove_program/${userID}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        imdb_id: this.state.imdbID,
        is_rejected: true,
        is_watchlist: false,
      })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
    .catch((error) => {
      console.log(error);
    })
  
  }

  

  render() {
    
    const userID = this.props.navigation.state.params.user_id
    console.log(userID)
      return (
        <SafeAreaView style={{ flex: 1}} >
            <View style={styles.mainContainer}>
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.modal2Visible}
              >
                <View style={styles.modalContainer}>
                  <View >
                    <Button
                      buttonStyle={styles.closeButton}
                      type="clear"
                      onPress={() => this.setState({
                        modal2Visible: false
                      })}
                      title="Close"
                      />
                  </View>
                  <Text style={styles.titleText}>{this.state.programInfo.Title}</Text>
                  <Tile 
                    imageSrc={{uri: this.state.moreInfoPoster}} 
                    imageContainerStyle={styles.posterContainer}
                    />
                  <View style={styles.ratingsContainer}>
                      <Image style={styles.ratingsLogos} source={require('../assets/images/imdb-logo.png') }/>
                      <Text style={styles.ratingsText}> {this.state.imdbRating} </Text>
                      <Image style={styles.ratingsLogos} source={require('../assets/images/rotten-tomatoes-logo.png')}/>
                      <Text style={styles.ratingsText}> {this.state.tomatoesRating} </Text>
                  </View>
                  <View style={styles.programCredits}>
                      <Text style={styles.modalText}> Genre: {this.state.programInfo.Genre}</Text>
                      <Text style={styles.modalText}> Release Date: {this.state.programInfo.Released}</Text>
                      <Text style={styles.modalText}> Plot: {this.state.programInfo.Plot}</Text>
                      <Text style={styles.modalText}> Cast: {this.state.programInfo.Actors}</Text>
                      <Text style={styles.modalText}> Director: {this.state.programInfo.Director}</Text>
                      <Text style={styles.modalText}> Writer: {this.state.programInfo.Writer}</Text>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <Button
                        type="clear"
                        style={styles.rejectButton}
                        onPress={() => this.addToRejectedList()}
                        icon={
                        <Icon
                            name="trash"
                            size={35}
                            color="red"
                        />
                      }
                    />
                    <Button
                        type="clear"
                        style={styles.seenButton}
                        onPress={() => this.addToSeenList()}
                        icon={
                        <Icon
                            name="eye-slash"
                            size={35}
                            color="blue"
                        />
                        }
                    />
                  </View>
                </View>
              </Modal>
            </View>
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
    height: 250,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  flatlistContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  caption: {
    justifyContent: 'flex-start',
    color: 'white',
    fontSize: 12,
    top: 135,
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
  editContainer: {
    bottom: 260,
    left: 75,
    // backgroundColor: ''
  },
  editbutton: {
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    height: 20,
    width: 20,
  },
  buttonsContainer: {
    marginTop: 25,
    width: Layout.window.width
  },
  seenButton: {
    alignSelf: 'flex-end',
    bottom: 55,
    marginRight: 50,
    height: 50,
    width: 50,
    borderRadius: 45,
    backgroundColor: 'white'
  },
  rejectButton: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    height: 50,
    width: 50,
    borderRadius: 45,
    backgroundColor: 'white'
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ratingsLogos: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  posterContainer: {
    height: 300,
    width: 175,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30,
    marginHorizontal: 20,
    // top: 10,
  },
  ratingsText: {
    color: 'white',
    top: 5,
    marginLeft: 5,
  },
  modalText: {
    color: 'white',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212'
  },
  closeButton: {
    height: 80,
    top:20,
  }
})
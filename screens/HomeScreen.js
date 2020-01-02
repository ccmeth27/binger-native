import React from 'react'
import { SafeAreaView, Modal, ScrollView, StyleSheet, Platform, Text, Image, View, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Tile, Button } from 'react-native-elements'
import Layout from '../constants/Layout'
import { AnimatedModal } from "react-native-modal-animated"
import { NavigationActions } from 'react-navigation';
import ToggleSwitch from '../components/ToggleSwitch'
import Icon from 'react-native-vector-icons/FontAwesome'
// import FastImage from 'react-native-fast-image'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 

class HomeScreen extends React.Component {
  
  state = {
    programs: [],
    previouslySwiped: [],
    loading: true,
    user_id: null,
    token: null,
    modalVisible: false,
    programInfo: {},
    moreInfoPoster: '../assets/images/what.gif',
    imdbRating: null,
    tomatoesRating: null,
    switch1Value: false,
    programType: 'movies',
    is_movie: 1,
  }
  
  
  componentDidMount() {
    let userID = this.props.navigation.state.params.user_id
    let username = this.props.navigation.state.params.username
    this.fetchPrograms()
    
    this.setUser(userID, username)
  }

  // fetchPreviouslySwiped = (userID) => {
  //   fetch(`http://localhost:3001/api/v1/user_programs/${userID}`)
  //   .then(resp => resp.json())
  //   .then(userSwiped => {
  //     // console.log(userSwiped)
  //     this.setState({
  //       previouslySwiped: userSwiped.user_programs
  //     },
  //     this.fetchPrograms()
  //     )
  //   })
  // }

  fetchPrograms() {
    let type = this.state.programType
      fetch(`http://api-public.guidebox.com/v2/${type}?api_key=b0ca45b98b8a26cc9bb30019569448b2daa0090f&limit=50`)
      .then(resp => resp.json())
      .then(programData => {
          this.setState({
          programs: programData.results,
          loading: false
          })
      })
      .catch((error) => {
          console.error(error);
        });
  }

  filterPrograms = () => {
    let filteredPrograms = []
    let guidebox = this.state.programs
    let swipedPrograms = this.state.previouslySwiped
    guidebox = guidebox.filter((item) => {
      return !swipedPrograms.includes(item.imdb_id)
    })
    console.log(guidebox)
  }

  

  setUser = (userID, username) => {
    console.log(userID)
    const setWatchlistParams = NavigationActions.setParams({
      params: { 
        user_id: userID,
        username: username 
      },
      key: 'Watchlist'
    });
    const setProfileParams = NavigationActions.setParams({
      params: { 
        user_id: userID,
        username: username  },
      key: 'Profile'
    });
    const setSearchParams = NavigationActions.setParams({
      params: { 
        user_id: userID,
        username: username  },
      key: 'Search'
    });
    this.props.navigation.dispatch(setWatchlistParams);
    this.props.navigation.dispatch(setProfileParams);
    this.props.navigation.dispatch(setSearchParams);
    
  }

  renderPrograms = (program) => {
    if(this.state.programType === 'movies') {
      return (
        <Tile
          key={program.id}
          imageSrc={{ uri: program.poster_400x570}}
          imageContainerStyle={styles.imageContainer}
          activeOpacity={0.9}
          title={program.title}
          titleStyle={styles.title}
          caption={program.release_year}
          captionStyle={styles.caption}
          containerStyle={styles.tileContainer}
          featured
        />
      )
    } else {
      return (
        <Tile
          key={program.id}
          imageSrc={{ uri: program.artwork_304x171}}
          imageContainerStyle={styles.imageContainer}
          borderWidth={2}
          activeOpacity={0.9}
          title={program.title}
          titleStyle={styles.title}
          caption={'First Aired:' + "" + program.first_aired}
          captionStyle={styles.caption}
          containerStyle={styles.tileContainer}
          featured
        />
      )
    }
  }

  toggleSwitch1 = (value) => {
    console.log('Switch is: ' + value)
    switch (value) {
      case true:
          this.setState({
              programType: 'shows',
              switch1Value: value,
              loading: true,
              is_movie: 0,
              },
              this.fetchPrograms
          )
          break;
      case false:
          this.setState({
              programType: 'movies',
              switch1Value: value,
              loading: true,
              is_movie: 1,
              },
              this.fetchPrograms
          )
          break;
  }
    
    
}

  //GESTURE ACTIONS

  swipeLeft = (cardIndex) => {
    let programData = this.state.programs[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    let poster;
    let released;
    let imdbID;
    if(this.state.is_movie === 0){
      poster = programData.artwork_304x171
      imdbID = programData.imdb_id
      released = programData.first_aired
    }else{
      poster = programData.poster_400x570
      imdbID = programData.imdb
      released = programData.release_year
    }
    fetch('http://localhost:3001/api/v1/user_programs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        guidebox_id: programData.id,
        is_seen: 0,
        is_rejected: 1,
        is_watchlist: 0,
        title: programData.title,
        poster: poster,
        release_year: released,
        imdb: imdbID,
        is_movie: this.state.is_movie,
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

  swipeRight = (cardIndex) => {
    let programData = this.state.programs[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    let poster;
    let released;
    let imdbID;
    if(this.state.is_movie === 0){
      poster = programData.artwork_304x171
      imdbID = programData.imdb_id
      released = programData.first_aired
    }else{
      poster = programData.poster_400x570
      imdbID = programData.imdb
      released = programData.release_year
    }
    fetch('http://localhost:3001/api/v1/user_programs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        guidebox_id: programData.id,
        is_seen: 0,
        is_rejected: 0,
        is_watchlist: 1,
        title: programData.title,
        poster: poster,
        release_year: released,
        imdb: imdbID,
        is_movie: this.state.is_movie,
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

  swipeUp = (cardIndex) => {
    let programData = this.state.programs[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    let poster;
    let released;
    let imdbID;
    if(this.state.is_movie === 0){
      poster = programData.artwork_304x171
      imdbID = programData.imdb_id
      released = programData.first_aired
    }else{
      poster = programData.poster_400x570
      imdbID = programData.imdb
      released = programData.release_year
    }
    fetch('http://localhost:3001/api/v1/user_programs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        guidebox_id: programData.id,
        is_seen: 1,
        is_rejected: 0,
        is_watchlist: 0,
        title: programData.title,
        poster: poster,
        release_year: released,
        imdb: imdbID,
        is_movie: this.state.is_movie
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

  getMoreInfo = (cardIndex) => {
    let imdbID;
    if (this.state.programType === 'movies') {
      imdbID = this.state.programs[cardIndex].imdb
      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6743b2b0`)
      .then(resp => resp.json())
      .then(programData => {
        console.log("Movie info:", programData)
        this.setState({
          loading: false,
          modalVisible: true,
          programInfo: programData,
          moreInfoPoster: programData.Poster,
          imdbRating: programData.Ratings[0].Value, 
          tomatoesRating: programData.Ratings[1].Value, 
        })
      })
    }else{
      let imdbID = this.state.programs[cardIndex].imdb_id
      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6743b2b0`)
      .then(resp => resp.json())
      .then(programData => {
        console.log("Series info:", programData)
        this.setState({
          loading: false,
          modalVisible: true,
          programInfo: programData,
          moreInfoPoster: programData.Poster,
        })
      })
    }
  }

  //END GESTURE ACTIONS
  
  render() {
    return (
      <SafeAreaView style={styles.container} >
        <View style={styles.mainContainer}>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
          >
          <View style={styles.modalContainer}>
            <View >
              <Button
                buttonStyle={styles.closeButton}
                type="clear"
                onPress={() => this.setState({
                  modalVisible: false
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
                  {this.state.imdbRating ?
                  <Text style={styles.modalText}> {this.state.imdbRating} </Text>
                  :
                  <Text style={styles.modalText}> N/A </Text>
                  }
                  <Image style={styles.ratingsLogos} source={require('../assets/images/rotten-tomatoes-logo.png')}/>
                  {this.state.tomatoesRating ?
                  <Text style={styles.modalText}> {this.state.tomatoesRating} </Text>
                  :
                  <Text style={styles.modalText}> N/A </Text>
                  }
                  </View>
                  <View style={styles.programCredits}>
                      <Text style={styles.modalText}> Genre: {this.state.programInfo.Genre}</Text>
                      <Text style={styles.modalText}> Release Date: {this.state.programInfo.Released}</Text>
                      <Text style={styles.modalText}> Plot: {this.state.programInfo.Plot}</Text>
                      <Text style={styles.modalText}> Cast: {this.state.programInfo.Actors}</Text>
                      <Text style={styles.modalText}> Director: {this.state.programInfo.Director}</Text>
                      <Text style={styles.modalText}> Writer: {this.state.programInfo.Writer}</Text>
                  </View>
                  {/* <View style={styles.buttonsContainer}>
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
                  </View> */}
                </View>
              </Modal>
            </View>
        <View>
          <View style={styles.switchContainer}>
              <Text style={styles.toggleText} >Movies</Text>
              <ToggleSwitch
                  toggleSwitch1 = {this.toggleSwitch1}
                  switch1Value = {this.state.switch1Value}/>
              <Text style={styles.toggleText} >Shows</Text>
          </View>
        </View>
        {this.state.loading ?
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        :
        <View>
          {this.state.programs.map(program =>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            key={program.id}
            style={styles.tileContainer}
            useViewOverFlow={false}
            cards={this.state.programs}
            renderCard={(program) => this.renderPrograms(program)}
            showSecondCard={true}
            onSwipedLeft={(cardIndex) => this.swipeLeft(cardIndex)}
            onSwipedRight={(cardIndex) => this.swipeRight(cardIndex)}
            onSwipeUp={(cardIndex) => this.swipeUp(cardIndex)}
            onTapCard={(cardIndex) => this.getMoreInfo(cardIndex)}
            onTapCardDeadZone={10}
            backgroundColor="#151515"
            cardHorizontalMargin={0}
            stackSize={2}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'white',
                    borderColor: 'black',
                    color: 'black',
                    borderWidth: 2
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: -30,
                    marginRight: 10
                  }
                }
              },
              right: {
                title: 'ADDED',
                style: {
                  label: {
                    backgroundColor: 'white',
                    borderColor: 'black',
                    color: 'black',
                    borderWidth: 2
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: -30,
                    marginLeft: 10
                  }
                }
              }
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity 
          />
          )}
        </View>
        }
      </SafeAreaView>
    )
  }
}

export default HomeScreen

const omdb_api = '6743b2b0'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  tileContainer: {
    alignItems: 'center',
    borderRadius: 25,
    paddingTop: 10,
    bottom: 40,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: Layout.window.width - 40,
    height: Layout.window.height - 300,
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 20,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 5,
  },
  switchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 25,
    paddingBottom: 10,
  },
  toggleText: {
      color: 'white',
      padding: 5,
      fontSize: 16,
  },
  modalCard: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT, 
    top: 80,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  posterContainer: {
    marginTop: 5,
    alignSelf: 'center',
    height: 200,
    width: 175,
    borderRadius: 20,
    
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 20,
  },
  ratingsText: {
    color: 'white',
    top: 5,
    marginLeft: 5,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 5,
    alignSelf: 'center',
    fontSize: 30,
    marginHorizontal: 20,
  },
  divider: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ratingsLogos: {
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center'

  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212'
  },
  closeButton: {
    height: 80,
    top:20,
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
})

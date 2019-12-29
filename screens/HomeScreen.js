import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Platform, Text, Image, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Tile, Divider } from 'react-native-elements'
import Layout from '../constants/Layout'
import { AnimatedModal } from "react-native-modal-animated"
import { NavigationActions, NavigationEvents } from 'react-navigation';
// import FastImage from 'react-native-fast-image'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 

class HomeScreen extends React.Component {
  
  state = {
    movies: [],
    user_id: null,
    token: null,
    modalVisible: false,
    programInfo: {},
    moreInfoPoster: '../assets/images/what.gif',
    imdbRating: 'N/A',
    tomatoesRating: 'N/A',
  }
  
  
  componentDidMount() {
    let userID = this.props.navigation.state.params.user_id
    let username = this.props.navigation.state.params.username
    this.fetchMovies()
    this.setUser(userID, username)
  }

  fetchMovies() {
      fetch(`http://api-public.guidebox.com/v2/movies?api_key=beeb2b0cc73bdf55f4ac9f1d8e9f595f9aaa14b6`)
      .then(resp => resp.json())
      .then(movieData => {
          this.setState({
          movies: movieData.results
          })
      })
      .catch((error) => {
          console.error(error);
        });
  }

  setUser = (userID, username) => {
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

  renderMovies = (movie) => {
      // console.log(movie)
      return (
        <Tile
          key={movie.id}
          imageSrc={{ uri: movie.poster_120x171}}
          imageContainerStyle={styles.imageContainer}
          activeOpacity={0.9}
          title={movie.title}
          titleStyle={styles.title}
          caption={movie.release_year}
          captionStyle={styles.caption}
          containerStyle={styles.tileContainer}
          featured
        />
      )
  }

  

  swipeLeft = (cardIndex) => {
    let movieData = this.state.movies[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    fetch('http://localhost:3001/api/v1/user_programs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        guidebox_id: movieData.id,
        is_seen: 0,
        is_rejected: 1,
        is_watchlist: 0,
        title: movieData.title,
        poster: movieData.poster_120x171,
        release_year: movieData.release_year,
        imdb: movieData.imdb,
        rottentomatoes: movieData.rottentomatoes
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
    let movieData = this.state.movies[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    fetch('http://localhost:3001/api/v1/user_programs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        guidebox_id: movieData.id,
        is_seen: 0,
        is_rejected: 0,
        is_watchlist: 1,
        title: movieData.title,
        poster: movieData.poster_120x171,
        release_year: movieData.release_year,
        imdb: movieData.imdb,
        rottentomatoes: movieData.rottentomatoes
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
    let movieData = this.state.movies[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    fetch('http://localhost:3001/api/v1/user_programs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        guidebox_id: movieData.id,
        is_seen: 1,
        is_rejected: 0,
        is_watchlist: 0,
        title: movieData.title,
        poster: movieData.poster_120x171,
        release_year: movieData.release_year,
        imdb: movieData.imdb,
        rottentomatoes: movieData.rottentomatoes
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
    let imdbID = this.state.movies[cardIndex].imdb
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6743b2b0`)
    .then(resp => resp.json())
    .then(programData => {
          this.renderMoreInfo(programData)
    })
  }

  renderMoreInfo = (programData) => {
    console.log(programData)
    this.setState({
      modalVisible: true,
      programInfo: programData,
      moreInfoPoster: programData.Poster,
      imdbRating: programData.Ratings[0].Value, 
      tomatoesRating: programData.Ratings[1].Value, 
    })
    
  }
  

  render() {
    console.log(this.props.navigation)
    return (
      <SafeAreaView style={styles.container} >
        <AnimatedModal
          visible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setState({ modalVisible: false });
          }}
          animationType="slide"
          duration={600}
         >
          <ScrollView 
            contentContainer={styles.scrollView}
            alwaysBounceVertical
            >
            <View style={styles.modalCard}>
              <Text style={styles.titleText}>{this.state.programInfo.Title}</Text>
              <Divider style={styles.divider}/>
              <Tile 
                imageSrc={{uri: this.state.moreInfoPoster}} 
                imageContainerStyle={styles.posterContainer}
                />
              <View style={styles.ratingsContainer}>
                <Image style={styles.ratingsLogos} source={require('../assets/images/imdb-logo.png') }/>
                <Text style={styles.modalText}> {this.state.imdbRating} </Text>
                <Image style={styles.ratingsLogos} source={require('../assets/images/rotten-tomatoes-logo.png')}/>
                <Text style={styles.modalText}> {this.state.tomatoesRating} </Text>
              </View>
              <View style={styles.programCredits}>
                <Text style={styles.modalText}> Genre: {this.state.programInfo.Genre}</Text>
                <Text style={styles.modalText}> Release Date: {this.state.programInfo.Released}</Text>
                <Text style={styles.modalText}> Plot: {this.state.programInfo.Plot}</Text>
                <Text style={styles.modalText}> Cast: {this.state.programInfo.Actors}</Text>
                <Text style={styles.modalText}> Director: {this.state.programInfo.Director}</Text>
                <Text style={styles.modalText}> Writer: {this.state.programInfo.Writer}</Text>
              </View>
            </View>
          </ScrollView>
        </AnimatedModal>
        
        {this.state.movies.map(movie =>
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          key={movie.id}
          style={styles.tileContainer}
          useViewOverFlow={false}
          cards={this.state.movies}
          renderCard={(movie) => this.renderMovies(movie)}
          showSecondCard={false}
          onSwipedLeft={(cardIndex) => this.swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => this.swipeRight(cardIndex)}
          onSwipeUp={(cardIndex) => this.swipeUp(cardIndex)}
          onTapCard={(cardIndex) => this.getMoreInfo(cardIndex)}
          onTapCardDeadZone={10}
          backgroundColor="#151515"
          borderRadius={25}
          cardHorizontalMargin={0}
          stackSize={2}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginRight: 40
                }
              }
            },
            right: {
              title: 'ADDED',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -60
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity 
        />
        )}
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
    flex: 1,
    alignItems: 'center',
    borderRadius: 25,
  },
  imageContainer: {
    width: Layout.window.width - 40,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 7,
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 30,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  scrollView: {

  },
  modalCard: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT, 
    top: 90,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  posterContainer: {
    marginTop: 10,
    alignSelf: 'center',
    height: 225,
    width: 200,
    borderRadius: 20,
    
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 20,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 20,
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
  }
})

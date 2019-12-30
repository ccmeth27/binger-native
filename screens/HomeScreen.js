import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Platform, Text, Image, View, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Tile, Divider } from 'react-native-elements'
import Layout from '../constants/Layout'
import { AnimatedModal } from "react-native-modal-animated"
import { NavigationActions } from 'react-navigation';
import ToggleSwitch from '../components/ToggleSwitch'
// import FastImage from 'react-native-fast-image'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 

class HomeScreen extends React.Component {
  
  state = {
    movies: [],
    loading: true,
    user_id: null,
    token: null,
    modalVisible: false,
    programInfo: {},
    moreInfoPoster: '../assets/images/what.gif',
    imdbRating: 'N/A',
    tomatoesRating: 'N/A',
    switch1Value: false,
    programType: 'movies',
    is_movie: 1,
  }
  
  
  componentDidMount() {
    let userID = this.props.navigation.state.params.user_id
    let username = this.props.navigation.state.params.username
    this.fetchMovies()
    this.setUser(userID, username)
  }

  fetchMovies() {
    let type = this.state.programType
      fetch(`http://api-public.guidebox.com/v2/${type}?api_key=beeb2b0cc73bdf55f4ac9f1d8e9f595f9aaa14b6`)
      .then(resp => resp.json())
      .then(movieData => {
          this.setState({
          movies: movieData.results,
          loading: false
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
    console.log(movie)
    if(this.state.programType === 'movies') {
      return (
        <Tile
          key={movie.id}
          imageSrc={{ uri: movie.poster_400x570}}
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
    } else {
      return (
        <Tile
          key={movie.id}
          imageSrc={{ uri: movie.artwork_304x171}}
          imageContainerStyle={styles.imageContainer}
          activeOpacity={0.9}
          title={movie.title}
          titleStyle={styles.title}
          caption={'First Aired:' + "" + movie.first_aired}
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
              this.fetchMovies
          )
          break;
      case false:
          this.setState({
              programType: 'movies',
              switch1Value: value,
              loading: true,
              is_movie: 1,
              },
              this.fetchMovies
          )
          break;
  }
    
    
}

  //GESTURE ACTIONS

  swipeLeft = (cardIndex) => {
    let movieData = this.state.movies[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    let poster;
    let released;
    let imdbID;
    if(this.state.is_movie === 0){
      poster = movieData.artwork_304x171
      imdbID = movieData.imdb_id
      released = movieData.first_aired
    }else{
      poster = movieData.poster_400x570
      imdbID = movieData.imdb
      released = movieData.release_year
    }
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
    let movieData = this.state.movies[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    let poster;
    let released;
    let imdbID;
    if(this.state.is_movie === 0){
      poster = movieData.artwork_304x171
      imdbID = movieData.imdb_id
      released = movieData.first_aired
    }else{
      poster = movieData.poster_400x570
      imdbID = movieData.imdb
      released = movieData.release_year
    }
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
    let movieData = this.state.movies[cardIndex]
    let userID = this.props.navigation.state.params.user_id
    let poster;
    let released;
    let imdbID;
    if(this.state.is_movie === 0){
      poster = movieData.artwork_304x171
      imdbID = movieData.imdb_id
      released = movieData.first_aired
    }else{
      poster = movieData.poster_400x570
      imdbID = movieData.imdb
      released = movieData.release_year
    }
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
    let imdbID = this.state.movies[cardIndex].imdb
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6743b2b0`)
    .then(resp => resp.json())
    .then(programData => {
      this.setState({
        loading: false,
        modalVisible: true,
        programInfo: programData,
        moreInfoPoster: programData.Poster,
        imdbRating: programData.Ratings[0].Value, 
        tomatoesRating: programData.Ratings[1].Value, 
      })
    })
  }

  //END GESTURE ACTIONS
  
  render() {
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
    bottom: 30,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 10,
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
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center'

  }
})

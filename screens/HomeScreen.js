import React from 'react'
import { SafeAreaView, StyleSheet, Platform } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Tile } from 'react-native-elements'
import Layout from '../constants/Layout'
// import FastImage from 'react-native-fast-image'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 

class HomeScreen extends React.Component {
  
  state = {
    movies: []
  }
  
  
  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies() {
      fetch(`http://api-public.guidebox.com/v2/movies?api_key=ecdec86bafadac43c038330199eec79294c468d8`)
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

  renderMovies = (movie) => {
      console.log(movie)
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
    console.log("Rejected", this.state.movies[cardIndex])
  }

  swipeRight = (cardIndex) => {
    console.log("Added to Watchlist", this.state.movies[cardIndex])
  }

  moreInfo = (cardIndex) => {
    console.log('More Info', this.state.movies[cardIndex])
  }
  

  render() {
    
    return (
      <SafeAreaView style={styles.container} >
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
          onSwipedLeft={(movie) => this.swipeLeft(movie)}
          onSwipedRight={(movie) => this.swipeRight(movie)}
          onTapCard={this.moreInfo}
          onTapCardDeadZone={10}
          backgroundColor="white"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
})

import React from 'react'
import { Text, SafeAreaView, StyleSheet, Platform, Image } from 'react-native'
import Swiper from 'react-native-deck-swiper'
// import { Card } from '../components/Card'
import { Tile } from 'react-native-elements'
import Layout from '../constants/Layout'

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

  render() {
    
    return (
      <SafeAreaView style={styles.container} >
        {this.state.movies.map(movie =>
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          useViewOverFlow={false}
          cards={this.state.movies}
          renderCard={(movie) => this.renderMovies(movie)}
          // infinite 
          backgroundColor="white"
          cardHorizontalMargin={0}
          stackSize={2} // number of cards shown in background
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
    backgroundColor: 'transparent',
  },
  tileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 6,
    borderRadius: 20,
    overflow: 'hidden', // this does magic
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

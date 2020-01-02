import React from 'react'
import { 
    ActivityIndicator, 
    Modal, 
    Platform, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    View,  
    FlatList,
    Image, 
    } from 'react-native'
import { SearchBar, Button } from 'react-native-elements';
import SearchCard from '../components/SearchCard'
import ToggleSwitch from '../components/ToggleSwitch'
import Layout from '../constants/Layout'
// import MoreInfoModal from '../components/MoreInfoModal'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { AnimatedModal } from "react-native-modal-animated"
import { Tile } from 'react-native-elements'
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49

class SearchScreen extends React.Component {
  
    state = {
        search: '',
        loading: false,
        searchResults: [],
        page: 1,
        programType: 'movie',
        switch1Value: false,
        modalVisible: false,
        programInfo: [],
        moreInfoPoster: '../assets/images/what.gif',
        imdbRating: 'N/A',
        tomatoesRating: 'N/A'
    };

    updateSearch = text => {
        // console.log(text)
        this.setState({
            search: text,
            loading: true
        })
    };

    getSearchResults = () => {
        // console.log(this.state.switch1Value)
        // console.log(this.state.programType)
        let type = this.state.programType
        let input = this.state.search
        let page = this.state.page
        fetch(`http://www.omdbapi.com/?s=${input}&type=${type}&apikey=6743b2b0`)
        .then(resp => resp.json())
        .then(results => {
            // console.log(results.Search)
            this.setState({
                searchResults: results.Search,
                loading: false,
            })

        })
    }

    toggleSwitch1 = (value) => {
        console.log('Switch is: ', value)
        switch (value) {
            case true:
                this.setState({
                    programType: 'series',
                    switch1Value: value,
                    loading: true,
                    tomatoesRating: 'N/A',
                    },
                    this.getSearchResults
                )
                break;
            case false:
                this.setState({
                    programType: 'movie',
                    switch1Value: value,
                    loading: true
                    },
                    this.getSearchResults
                )
                break;
        }
    }

    getMoreInfo = (item) => {
        let imdb = item.imdbID
        fetch(`http://www.omdbapi.com/?i=${imdb}&apikey=6743b2b0`)
        .then(resp => resp.json())
        .then(programData => {
            console.log(programData)
            if (this.state.programType === 'movie') {
                this.setState({
                    modalVisible: true,
                    programInfo: programData,
                    moreInfoPoster: programData.Poster,
                    imdbRating: programData.Ratings[0].Value, 
                    tomatoesRating: programData.Ratings[1].Value, 
                })
            }else{
                this.setState({
                    modalVisible: true,
                    programInfo: programData,
                    moreInfoPoster: programData.Poster,
                    imdbRating: 'N/A', 
                    tomatoesRating: 'N/A'
                })}
        })
    } 
    renderItem = (item) => {
        return(
            <View>
                <SearchCard item={item}/>
                    <Button
                        type="clear"
                        style={styles.infoButton}
                        onPress={() => this.getMoreInfo(item)}
                        icon={
                        <Icon
                            name="info"
                            size={35}
                            color="purple"
                        />
                        }
                    />
            </View>
        )
    }

    addToWatchList = (item) => {
        let userID = this.props.navigation.state.params.user_id
        let type;
        if (item.Type === 'movie'){
            type = 1
        }else{
            type = 0
        }
        fetch('http://localhost:3001/api/v1/user_programs', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            guidebox_id: 0,
            is_seen: 0,
            is_rejected: 0,
            is_watchlist: 1,
            title: item.Title,
            poster: item.Poster,
            release_year: item.Year,
            imdb: item.imdbID,
            is_movie: type,
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

    addToSeenList = (item) => {
        let userID = this.props.navigation.state.params.user_id
        let type;
        if (item.Type === 'movie'){
            type = 1
        }else{
            type = 0
        }
        fetch('http://localhost:3001/api/v1/user_programs', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            guidebox_id: 0,
            is_seen: 1,
            is_rejected: 0,
            is_watchlist: 0,
            title: item.Title,
            poster: item.Poster,
            release_year: item.Year,
            imdb: item.imdbID,
            is_movie: type,
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

    

    render () {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.toggleText} >Movies</Text>
                <ToggleSwitch
                    toggleSwitch1={this.toggleSwitch1}
                    switch1Value={this.state.switch1Value}/>
                <Text style={styles.toggleText} >Shows</Text>
            </View>
            <View>
                <SearchBar
                    placeholder="Search by title"
                    onChangeText={(text) => this.updateSearch(text)}
                    value={this.state.search}
                    platform="ios"
                    autoCorrect={false}
                    keyboardType="default"
                    containerStyle={styles.searchContainer}
                    keyboardAppearance="dark"
                    round={true}
                    onSubmitEditing={this.getSearchResults}
                    autoFocus={true}
                
                />
            </View>
            <View>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.modalVisible}
            >
          <View style={styles.modalContainer}>
            <View >
              <Button
                // color="#000"
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
                          style={styles.seenButton}
                          onPress={() => this.addToSeenList(item)}
                          icon={
                          <Icon
                              name="eye-slash"
                              size={35}
                              color="blue"
                          />
                          }
                      />
                    <Button
                        type="clear"
                        style={styles.addButton}
                        onPress={() => this.addToWatchlist(item)}
                        icon={
                        <Icon
                            name="bookmark"
                            size={35}
                            color="green"
                        />
                      }
                    />
                  </View>
                </View>
              </Modal>
            </View>
            {this.state.loading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
            :
            <View>
                <FlatList
                    data={this.state.searchResults}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.Poster}
                    horizontal={true}
                    
                    />
            </View>
            }
                
        </SafeAreaView>
        )
    }
  
}

export default SearchScreen

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },
    container: {
        backgroundColor: '#151515',
    },
    searchInput: {
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        marginVertical: 90,
        justifyContent: 'center'
    },
    searchContainer: {
        backgroundColor: '#151515',
        marginTop: 5,
        marginHorizontal: 5,
    },
    flatListStyle: {
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    toggleText: {
        color: 'white',
        padding: 5,
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        height: 60,
        bottom: 50,
    },
    infoButton: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 45,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'purple',
        bottom: 25,
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
       height: 175,
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
       fontWeight: 'bold',
       marginTop: 5,
       marginHorizontal: 20,
    },
    titleText: {
       color: 'white',
       fontWeight: 'bold',
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
       alignSelf: 'center',
       justifyContent: 'center',
       height: 30,
       width: 30,
    },
    modalContainer: {
       flex: 1,
       backgroundColor: '#121212'
    },
    closeButton: {
       height: 80,
       top:20,
       color: 'white'
    },
    buttonsContainer: {
       marginTop: 25,
       width: Layout.window.width
    },
    addButton: {
       alignSelf: 'flex-end',
       bottom: 52,
       marginRight: 50,
       height: 50,
       width: 50,
       borderRadius: 45,
       backgroundColor: 'white'
    },
    seenButton: {
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
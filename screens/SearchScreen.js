import React from 'react'
import { 
    ActivityIndicator, 
    ScrollView, 
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
import { AnimatedModal } from "react-native-modal-animated"
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
        console.log(text)
        this.setState({
            search: text,
            loading: true
        })
    };

    getSearchResults = () => {
        console.log(this.state.switch1Value)
        console.log(this.state.programType)
        let type = this.state.programType
        let input = this.state.search
        let page = this.state.page
        fetch(`http://www.omdbapi.com/?s=${input}&type=${type}&apikey=6743b2b0`)
        .then(resp => resp.json())
        .then(results => {
            console.log(results.Search)
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
            this.setState({
                modalVisible: true,
                programInfo: programData,
                moreInfoPoster: programData.Poster,
                imdbRating: programData.Ratings[0].Value, 
                // tomatoesRating: programData.Ratings[1].Value, 
          })
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
                        size={60}
                        color="white"
                        />
                        }
                        />
            </View>
        )
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
                    placeholder="Type Here..."
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
            <Text style={styles.results}>Results:</Text>
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
    results: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        marginLeft: 40,
    },
    searchInput: {
        color: 'white'
    },
    loadingContainer: {
        flex: 2,
        marginVertical: 90,
        justifyContent: 'center'
    },
    searchContainer: {
        backgroundColor: '#151515',
        marginVertical: 5,
    },
    flatListStyle: {
        flex: 1,
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
    infoButton: {
        height: 75,
        width: 75,
        backgroundColor: 'purple',
        borderRadius: 45,
        bottom: 45,
        alignSelf: 'flex-end'

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
    
    
})

{/* <View>
    <MoreInfoModal
        visible={this.state.modalVisible}
        onBackdropPress={() => {
            this.setState({ modalVisible: false });
        }}
        programInfo={this.state.programInfo}
        imdbRating={this.state.imdbRating}
        tomatoesRating={this.state.tomatoesRating}
        moreInfoPoster={this.moreInfoPoster}            
    />
</View> */}
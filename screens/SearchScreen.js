import React from 'react'
import { ActivityIndicator, TouchableOpacity, Text, SafeAreaView, StyleSheet, View, Switch, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import SearchCard from '../components/SearchCard'
import ToggleSwitch from '../components/ToggleSwitch'
import Layout from '../constants/Layout'
import MoreInfoModal from '../components/MoreInfoModal'

class SearchScreen extends React.Component {
  
    state = {
        search: '',
        loading: false,
        searchResults: [],
        page: 1,
        switch1Value: false,
        programType: 'movie',
        modalVisible: false,
        programInfo: {},
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
        let input = this.state.search
        let type = this.state.programType
        let page = this.state.page
        fetch(`http://www.omdbapi.com/?s=${input}&type=${type}&apikey=6743b2b0`)
        .then(resp => resp.json())
        .then(results => {
            console.log(results.Search)
            this.setState({
                loading: false,
                searchResults: results.Search
            })

        })
    }

    toggleSwitch1 = (value) => {
        console.log('Switch is: ' + value)
        switch (value) {
            case true:
                this.setState({
                    programType: 'series',
                    switch1Value: value
                })
                break;
            case false:
                this.setState({
                    programType: 'movie',
                    switch1Value: value
                })
                break;
            default:
                break;
        }
        
    }


    getMoreInfo = (cardIndex) => {
        let imdbID = this.state.movies[cardIndex].imdb
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6743b2b0`)
        .then(resp => resp.json())
        .then(programData => {
            this.setState({
                modalVisible: true,
                programInfo: programData,
                moreInfoPoster: programData.Poster,
                imdbRating: programData.Ratings[0].Value, 
                tomatoesRating: programData.Ratings[1].Value, 
          })
        })
    }

    render () {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.toggleText} >Movies</Text>
                <ToggleSwitch
                    toggleSwitch1 = {this.toggleSwitch1}
                    switch1Value = {this.state.switch1Value}/>
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
            <View>
                <MoreInfoModal
                        visible={this.state.modalVisible}
                        onBackdropPress={() => {
                            this.setState({ modalVisible: false });
                        }}
                        programInfo={this.state.programInfo}
                        
                    />
            </View>
            {this.state.loading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
            :
            <View>
                <FlatList
                    data={this.state.searchResults}
                    renderItem={({ item }) => <SearchCard item={item} />}
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
    }
    
    
})
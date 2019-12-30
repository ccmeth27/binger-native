import React from 'react'
import { ActivityIndicator, Text, SafeAreaView, StyleSheet, View, Switch, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import SearchCard from '../components/SearchCard'
import Layout from '../constants/Layout'

class SearchScreen extends React.Component {
  
    state = {
        search: '',
        loading: false,
        type: 'movie',
        searchResults: [],
        page: 1,
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
        let type = this.state.type
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

    render () {
        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Search</Text>
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
            <Text style={styles.results}>Results:</Text>
            {this.state.loading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
            :
            <FlatList
                data={this.state.searchResults}
                renderItem={({ item }) => <SearchCard item={item} />}
                keyExtractor={item => item.Poster}
                horizontal={true}
                // contentContainerStyle={styles.flatListStyle}
                />
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
        fontSize: 40,
        alignSelf: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
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
        justifyContent: 'center'
    },
    searchContainer: {
        backgroundColor: '#151515',
        marginVertical: 15
    },
    flatListStyle: {
        flex: 1,
        
    }
    
    
})
import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements';

class SearchScreen extends React.Component {
  
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    componentDidMount = () => {

    }
    
    render () {
        console.log(this.props.navigation)
        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Search</Text>
            <SearchBar/>
            <Text style={styles.results}>Results:</Text>
        </SafeAreaView>
        )
    }
  
}

export default SearchScreen

const styles =StyleSheet.create({
    header: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
        marginTop: 20,
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
        marginVertical: 15,
    },
})
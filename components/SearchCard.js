import React from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'
import { Card } from 'react-native-elements'
import Layout from '../constants/Layout'
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 
export default function SearchCard (props) {
    const { item } = props.item
    return (
        
            // <Card>
                <View style={styles.cardView}>
                    <Image
                      style={styles.cardImage}
                      resizeMode="cover"
                      source={{ uri: props.item.Poster }}
                    />
                    <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}> {props.item.Title} - {props.item.Year}</Text>

                    </View>
                </View>
            // </Card>

    );
}

const styles = StyleSheet.create({
    cardView: {
        borderColor: 'black',
        backgroundColor: 'transparent',
        marginHorizontal: 5,
        marginTop: 10,
        
    },
    cardImage: {
        width: Layout.window.width - 85,
        height: 500,
        borderRadius: 20,
    },
    cardTitle: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        
       
    },
    textContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
    
})
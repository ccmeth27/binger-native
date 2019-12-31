import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Layout from '../constants/Layout'
import Icon from 'react-native-vector-icons/FontAwesome'
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 
export default function SearchCard (props) {
        return (
                <View style={styles.cardView}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}> {props.item.Title} - {props.item.Year}</Text>
                    </View>
                    <Image
                      style={styles.cardImage}
                      resizeMode="cover"
                      source={{ uri: props.item.Poster }}
                    />
                </View>
        );
}

const styles = StyleSheet.create({
    cardView: {
        width: 350,
        borderColor: 'black',
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        marginTop: 15,
        
    },
    cardImage: {
        width: Layout.window.width - 85,
        height: 500,
        borderRadius: 20,
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        
    },
    textContainer: {
        flexWrap: 'wrap',
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    
    
    
})
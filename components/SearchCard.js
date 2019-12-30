import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Layout from '../constants/Layout'
import Icon from 'react-native-vector-icons/FontAwesome'
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 
export default function SearchCard (props) {
// export default class SearchCard extends React.Component {
    // render(){
        
    
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
                    <Button
                        type="clear"
                        style={styles.infoButton}
                        onPress={() => console.log('pressing', props.item)}
                        icon={
                        <Icon
                            name="info"
                            size={60}
                            color="white"
                            />
                            }
                            />

                </View>
        
            

        );
    // }
}

const styles = StyleSheet.create({
    cardView: {
        borderColor: 'black',
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        marginTop: 15,
        
    },
    cardImage: {
        width: Layout.window.width - 85,
        height: 500,
        borderRadius: 20,
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
        alignContent: 'center'
    },
    infoButton: {
        height: 75,
        width: 75,
        backgroundColor: 'purple',
        borderRadius: 45,
        bottom: 45,
        alignSelf: 'flex-end'

    }
    
    
})
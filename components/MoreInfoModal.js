import React from "react"
import {View, StyleSheet, ScrollView, Dimensions, Platform, Text, Image} from "react-native"
import Layout from '../constants/Layout'
import { AnimatedModal } from "react-native-modal-animated"
import { Tile } from 'react-native-elements'
const screenHeight = Dimensions.get("window").height
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49
export default function MoreInfoModal(props){

        return (
            <AnimatedModal
                visible={props.modalVisible}
                animationType="slide"
                duration={600}
                >
                <ScrollView 
                    alwaysBounceVertical
                     >
                    <View style={styles.modalCard}>
                        <Text style={styles.titleText}>{props.programInfo.Title}</Text>
                        <Tile 
                            imageSrc={{uri: props.moreInfoPoster}} 
                            imageContainerStyle={styles.posterContainer}
                            />
                        <View style={styles.ratingsContainer}>
                            <Image style={styles.ratingsLogos} source={require('../assets/images/imdb-logo.png') }/>
                            <Text style={styles.modalText}> {props.imdbRating} </Text>
                            <Image style={styles.ratingsLogos} source={require('../assets/images/rotten-tomatoes-logo.png')}/>
                            <Text style={styles.modalText}> {props.tomatoesRating} </Text>
                        </View>
                        <View style={styles.programCredits}>
                            <Text style={styles.modalText}> Genre: {props.programInfo.Genre}</Text>
                            <Text style={styles.modalText}> Release Date: {props.programInfo.Released}</Text>
                            <Text style={styles.modalText}> Plot: {props.programInfo.Plot}</Text>
                            <Text style={styles.modalText}> Cast: {props.programInfo.Actors}</Text>
                            <Text style={styles.modalText}> Director: {props.programInfo.Director}</Text>
                            <Text style={styles.modalText}> Writer: {props.programInfo.Writer}</Text>
                        </View>
                    </View>
                </ScrollView>
            </AnimatedModal>
        )
    
}

const styles = StyleSheet.create({
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
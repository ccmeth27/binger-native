import React from "react"
import {View, StyleSheet, ScrollView, Animated, Dimensions, Text, Image, TouchableOpacity} from "react-native"
import Layout from '../constants/Layout'
import { AnimatedModal } from "react-native-modal-animated"
import { Tile } from 'react-native-elements'
const screenHeight = Dimensions.get("window").height

export default function MoreInfoModal(props){

    const { info } = props.programInfo
        return (
            <AnimatedModal
                // visible={props.modalVisible}
                // onBackdropPress={() => {
                //     this.setState({ modalVisible: false });
                //     }}
                animationType="slide"
                duration={600}
                >
                <ScrollView 
                    contentContainer={styles.scrollView}
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
    

})
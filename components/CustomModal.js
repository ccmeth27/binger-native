import React from "react"
import {View, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native"
import Layout from '../constants/Layout'
import * as Icon from "@expo/vector-icons"

const screenHeight = Dimensions.get("window").height

class CustomModal extends React.Component {

    state = {
        top: new Animated.Value(screenHeight)
    }

    componentDidMount() {
        this.toggleModal()
    }

    toggleModal = () => {
        Animated.spring(this.state.top, {
            toValue: 174
        }).start()
    }

    closeModal = () => {
        Animated.spring(this.state.top, {
            toValue: screenHeight
        }).start()
    }

    render() {
        return (
            <Animated.View 
                style={styles.container}
                
                >
                <View style={styles.header}></View>
                <TouchableOpacity
                    onPress={this.closeModal}
                    style={styles.closeIcon}
                >
                    <View style={styles.closeView}>
                        <Icon.Ionicons name='ios-close' size={44} color='blue' />
                    </View>
                </TouchableOpacity>
                <View style={styles.body}></View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        width: Layout.window.width,
        height: Layout.window.height - 20,
        top: this.state.top,
    },
    header: {
        backgroundColor: 'black',
        height: 150,
    },
    body: {
        backgroundColor: 'white',
        height: 900,
    },
    closeIcon: { 
        position: "absolute", 
        top: 120, 
        left: "50%", 
        marginLeft: -22, 
        zIndex: 1, 
    },
    closeView: {
        height: 44,
        width: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    }
    
})

export default CustomModal
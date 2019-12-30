import React from 'react'
import { StyleSheet, Text, View, Platform, Switch } from 'react-native'
import Layout from '../constants/Layout'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 

export default function ToggleSwitch (props) {
    return (
        <View >
            <Switch
                onValueChange = {props.toggleSwitch1}
                value = {props.switch1Value}
                />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
       marginTop: 15,
       marginBottom: 25,
       backgroundColor: 'white',
    },
    toggleText: {
        color: 'white'
    }
})
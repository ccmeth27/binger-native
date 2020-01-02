import React from 'react'
import { FlatList, View, StyleSheet,} from 'react-native'
import Constants from 'expo-constants'
export default function BrowseFlatList ({props, renderMostPopular}){
      

    
    
    return (
        <View style={styles.flatlistContainer}>
            <FlatList
                data={props.mostPopular}
                renderMostPopular={({ item }) => props.renderMostPopular(item)}
                keyExtractor={item => item.id}
                numColumns={2}
                // refreshing={refreshing}
                // onRefresh={onRefresh}
            />
      </View>
      )
  }
  const styles = StyleSheet.create({
    flatlistContainer: {
        alignItems: 'center',
        marginBottom: 100,
      },
    caption: {
        justifyContent: 'flex-start',
        color: 'white',
        fontSize: 12,
        top: 135,
    },
  })
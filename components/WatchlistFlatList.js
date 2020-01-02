import React from 'react'
import { 
    ActivityIndicator, 
    FlatList, 
    Text, 
    SafeAreaView, 
    Image, 
    View, 
    StyleSheet,
    ScrollView,
    RefreshControl,
    Modal
  } from 'react-native'
  import Constants from 'expo-constants'
  export default function WatchlistFlatList (props){
      
    function wait(timeout) {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
    
    
    return (
        <View style={styles.flatlistContainer}>
            <FlatList
                data={props.allUserPrograms}
                renderItem={({ item }) => props.renderItem(item)}
                keyExtractor={item => item.id}
                numColumns={2}
                on
                refreshing={refreshing}
                onRefresh={onRefresh}
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
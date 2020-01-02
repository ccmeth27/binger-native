import React from 'react'
import { 
    SafeAreaView, 
    StyleSheet, 
    Text,  
    View, 
    Button,
    ActivityIndicator, 
} from 'react-native'
import { Avatar } from "react-native-elements";
import Layout from '../constants/Layout'
import { NavigationActions } from 'react-navigation';

export default class SubscriptionsScreen extends React.Component {

    state={
        amazonSelected: false,
        disneySelected: false,
        fxSelected: false,
        hboSelected: false,
        huluSelected: false,
        netflixSelected: false,
        showtimeSelected: false,
        starzSelected: false,
        tbsSelected: false,
        tntSelected: false,
        usaSelected: false,
        currentUser: null,
        currentUsername: '',
        loading: true,
    }

    componentDidMount(){
        let userID = this.props.navigation.state.params.user_id
        let username = this.props.navigation.state.params.username
        this.setState({
            currentUser: userID,
            currentUsername: username
        },
        this.getUserSubscriptions(userID)
        )
        
        // this.setUser(userID, username)
    }

    getUserSubscriptions = () => {
        fetch(`http://localhost:3001/api/v1/show_subscriptions/${userID}`)
    }

    //   setUser = (userID, username) => {
    //     const setHomeParams = NavigationActions.setParams({
    //         params: { 
    //           user_id: userID,
    //           username: username 
    //         },
    //         key: 'Home'
    //     });
    //       this.props.navigation.dispatch(setHomeParams);
    //   }

      saveServices = () => {
        fetch('http://localhost:3001/api/v1/subscriptions/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: this.state.currentUser,
            amazon: this.state.amazonSelected,
            disney: this.state.disneySelected,
            fx: this.state.fxSelected,
            hbo: this.state.hboSelected,
            hulu: this.state.huluSelected,
            netflix: this.state.netflixSelected,
            showtime: this.state.showtimeSelected,
            starz: this.state.starzSelected,
            tbs: this.state.tbsSelected,
            tnt: this.state.tntSelected,
            usa: this.state.usaSelected,
          })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.errors){
                console.log(data.errors)
              }
            else { 
                this.props.navigation.navigate({ 
                    routeName: 'Home', 
                    params: {
                        user_id: this.state.currentUser,
                        username: this.state.currentUsername,
                    }
                });
            }
        })
        .catch((error) => {
          console.log(error);
        })
      }


      render () {
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Subscriptions</Text>
                <Text style={styles.subHeader}>Please select the services you subscribe to:</Text>
                {this.state.loading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
                :
                <View style={styles.subscriptionsContainer}>
                    <View style={styles.rowContainer}>
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            overlayContainerStyle=""
                            onPress={() => this.setState({ amazonSelected: !this.state.amazonSelected})}
                            onEditPress={() => this.setState({amazonSelected: !this.state.amazonSelected})}
                            source={require('../assets/images/amazon.png')}
                            showEditButton
                            editButton={
                                this.state.amazonSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ disneySelected: !this.state.disneySelected})}
                            onEditPress={() => this.setState({disneySelected: !this.state.disneySelected})}
                            source={require('../assets/images/disney.png')}
                            showEditButton
                            editButton={
                                this.state.disneySelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ fxSelected: !this.state.fxSelected})}
                            onEditPress={() => this.setState({fxSelected: !this.state.fxSelected})}
                            source={require('../assets/images/fx.png')}
                            showEditButton
                            editButton={
                                this.state.fxSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />   
                    </View>
                    <View style={styles.rowContainer}>
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ hboSelected: !this.state.hboSelected})}
                            onEditPress={() => this.setState({hboSelected: !this.state.hboSelected})}
                            source={require('../assets/images/hbo.png')}
                            showEditButton
                            editButton={
                                this.state.hboSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ huluSelected: !this.state.huluSelected})}
                            onEditPress={() => this.setState({huluSelected: !this.state.huluSelected})}
                            source={require('../assets/images/hulu.png')}
                            showEditButton
                            editButton={
                                this.state.huluSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ netflixSelected: !this.state.netflixSelected})}
                            onEditPress={() => this.setState({netflixSelected: !this.state.netflixSelected})}
                            source={require('../assets/images/netflix.png')}
                            showEditButton
                            editButton={
                                this.state.netflixSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                    </View>
                    <View style={styles.rowContainer}>
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ showtimeSelected: !this.state.showtimeSelected})}
                            onEditPress={() => this.setState({showtimeSelected: !this.state.showtimeSelected})}
                            source={require('../assets/images/showtime.png')}
                            showEditButton
                            editButton={
                                this.state.showtimeSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ starzSelected: !this.state.starzSelected})}
                            onEditPress={() => this.setState({starzSelected: !this.state.starzSelected})}
                            source={require('../assets/images/starz.png')}
                            showEditButton
                            editButton={
                                this.state.starzSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ tbsSelected: !this.state.tbsSelected})}
                            onEditPress={() => this.setState({tbsSelected: !this.state.tbsSelected})}
                            source={require('../assets/images/tbs.png')}
                            showEditButton
                            editButton={
                                this.state.tbsSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />     
                    </View>
                    <View style={styles.rowContainer}>
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ tntSelected: !this.state.tntSelected})}
                            onEditPress={() => this.setState({tntSelected: !this.state.tntSelected})}
                            source={require('../assets/images/tnt.png')}
                            showEditButton
                            editButton={
                                this.state.tntSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => this.setState({ usaSelected: !this.state.usaSelected})}
                            onEditPress={() => this.setState({usaSelected: !this.state.usaSelected})}
                            source={require('../assets/images/usa.png')}
                            showEditButton
                            editButton={
                                this.state.usaSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                    </View>
                </View>
                }
                <View style={styles.continueButton}>
                    <Button 
                        title="Save" 
                        type="clear" 
                        color="black" 
                        onPress={() => this.saveServices()}/>
                </View>
      
            </SafeAreaView>
        )
      }
}

const styles = StyleSheet.create({
    subscriptionsContainer: {
        height: 500,
        width: Layout.window.width,
    },
    rowContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        top: 40,
    },
    logoContainer: {
        margin: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
    },
    subHeader: {
        marginHorizontal: 40,
        fontSize: 20,
        marginTop: 40,
        alignSelf: 'center'

    },
    continueButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'black',
        backgroundColor: '#20DB3A',
        width: 200,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        flex: 1,
        backgroundColor: '#121212',
        
    }
    
})
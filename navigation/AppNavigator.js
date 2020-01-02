import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import SubscriptionsScreen from '../screens/SubscriptionsScreen'

const AuthStack = createStackNavigator(
  {
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null,
        
      }
    },
    Subscriptions: {
      screen: SubscriptionsScreen,
      navigationOptions: {
        headerShown: false,
        header: null,
      }
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerShown: false,
        header: null,
      },
    },
  },{
    initialRouteName: 'SignUp',
  }
)


export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: {
      screen: AuthLoadingScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        headerShown: false,
      }
    },
    Auth: {
      screen: AuthStack,
      navigationOptions: {
        headerShown: false,
      }
    }
  },{
    initialRouteName: 'AuthLoading',
    headerMode: "none",
  }
  
  )
);

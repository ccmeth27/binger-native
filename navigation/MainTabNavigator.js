import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import ProfileScreen from '../screens/ProfileScreen';

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//   },
//   {
//     headerMode: 'none',
//   },
// );

HomeScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeScreen.path = '';

// const WatchlistStack = createStackNavigator(
//   {
//     Watchlist: WatchlistScreen,
//   },
//   {
//     headerMode: 'none',
//   },
// );

WatchlistScreen.navigationOptions = {
  tabBarLabel: 'Watchlist',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} 
    />
  ),
};

WatchlistScreen.path = '';

// const ProfileStack = createStackNavigator(
//   {
//     Profile: ProfileScreen,
//   },
//   {
//     headerMode: 'none',
//   },
// );

ProfileScreen.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ProfileScreen.path = '';

const tabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Discover'
      }
    },
    Watchlist: {
      screen: WatchlistScreen,
      navigationOptions: {
        title: 'My Wishlist'
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'username',
        
      }
    },
    },{
      headerMode: 'none',
    },
);

tabNavigator.path = '';

export default tabNavigator;

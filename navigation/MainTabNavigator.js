import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });

HomeScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeScreen.path = '';

WatchlistScreen.navigationOptions = {
  tabBarLabel: 'Watchlist',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'} 
    />
  ),
};

WatchlistScreen.path = '';


ProfileScreen.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

ProfileScreen.path = '';

SearchScreen.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

SearchScreen.path = '';

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
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: 'Search',
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
      tabBarOptions: {
        style: {
          backgroundColor:'#272727'
        }
      }
    },
);

tabNavigator.path = '';

export default tabNavigator;

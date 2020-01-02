
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileScreen from '../screens/ProfileScreen'



const DrawerNavigator = createDrawerNavigator({
    More: {
      screen: ProfileScreen,
    },
    Notifications: {
      screen: MyNotificationsScreen,
    }
});

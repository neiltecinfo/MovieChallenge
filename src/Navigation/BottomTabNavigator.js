import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavMovies from '../Screens/FavMovies/FavMovies';
import FavMovieActive from '../Assets/FavMovieActive';
import FavMovieInactive from '../Assets/FavMovieInactive';
import Home from '../Screens/Home/Home';
import HomeActiveIcon from '../Assets/HomeActiveIcon';
import HomeInactiveIcon from '../Assets/HomeInactiveIcon';
import Watchlist from '../Screens/WatchlistScreens/Watchlist';
import WatchlistActiveIcon from '../Assets/WatchlistActiveIcon';
import WatchlistInactiveIcon from '../Assets/WatchlistInactiveIcon';
import ProfileActiveIcon from '../Assets/ProfileActiveIcon';
import ProfileInactiveIcon from '../Assets/ProfileInactiveIcon';
import ProfileScreen from '../Screens/ProfileTab/ProfileScreen';

const insightsData = 'NIFTY';
const Tab = createBottomTabNavigator();
const SIZE = 25;

const BottomTabNavigator = () => {
  return (
    <View style={styles.mainView}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabNavigatorBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{data: insightsData}}
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text
                style={focused ? styles.focusedStyle : styles.unfocusedStyle}>
                Home
              </Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <HomeActiveIcon width={SIZE} height={SIZE} />
              ) : (
                <HomeInactiveIcon width={SIZE} height={SIZE} />
              ),
          }}
        />

        <Tab.Screen
          name="FavMovies"
          component={FavMovies}
          initialParams={{data: insightsData}}
          options={{
            headerShown: false,
            title: 'FavMovies',
            tabBarLabel: ({focused}) => (
              <Text
                style={focused ? styles.focusedStyle : styles.unfocusedStyle}>
                FavMovies
              </Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <FavMovieActive width={SIZE} height={SIZE} />
              ) : (
                <FavMovieInactive width={SIZE} height={SIZE} />
              ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={Watchlist}
          initialParams={{data: insightsData}}
          options={{
            headerShown: false,
            title: 'Watchlist',
            tabBarLabel: ({focused}) => (
              <Text
                style={focused ? styles.focusedStyle : styles.unfocusedStyle}>
                Watchlist
              </Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <WatchlistActiveIcon width={SIZE} height={SIZE} />
              ) : (
                <WatchlistInactiveIcon width={SIZE} height={SIZE} />
              ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          initialParams={{data: insightsData}}
          options={{
            headerShown: false,
            title: 'ProfileScreen',
            tabBarLabel: ({focused}) => (
              <Text
                style={focused ? styles.focusedStyle : styles.unfocusedStyle}>
                Profile
              </Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <ProfileActiveIcon width={SIZE} height={SIZE} />
              ) : (
                <ProfileInactiveIcon width={SIZE} height={SIZE} />
              ),
          }}
        />
        {/* import ProfileActiveIcon from '../Assets/ProfileActiveIcon';
        import ProfileInactiveIcon from '../Assets/ProfileInactiveIcon'; */}
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabNavigatorBarStyle: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  mainView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tabBarItemStyle: {
    width: 'auto',
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  focusedStyle: {
    textDecorationLine: 'underline',
    fontSize: 12,
    fontWeight: '500',
  },
  unfocusedStyle: {
    textDecorationLine: 'none',
    fontWeight: '400',
    fontSize: 12,
  },
});

//   "dependencies": {
//   "@babel/plugin-transform-react-jsx-self": "^7.24.7",
//   "@eliav2/react-native-collapsible-view": "^1.5.1",
//   "@metafic-co/react-native-glassmorphism": "^0.1.2",
//   "@react-native-async-storage/async-storage": "^1.23.1",
//   "@react-native-clipboard/clipboard": "^1.13.2",
//   "@react-native-community/blur": "^4.4.0",
//   "@react-native-community/checkbox": "^0.5.17",
//   "@react-native-vector-icons/material-icons": "^0.0.1-alpha.25",
//   "@react-navigation/bottom-tabs": "^6.5.20",
//   "@react-navigation/drawer": "^6.6.15",
//   "@react-navigation/material-top-tabs": "^6.6.13",
//   "@react-navigation/native": "^6.1.17",
//   "@react-navigation/native-stack": "^6.9.26",
//   "@react-navigation/stack": "^6.3.29",
//   "@rneui/base": "^4.0.0-rc.7",
//   "@rneui/themed": "^4.0.0-rc.8",
//   "@shopify/react-native-skia": "^1.3.8",
//   "accordion-collapse-react-native": "^1.1.1",
//   "react": "18.2.0",
//   "react-native": "^0.74.1",
//   "react-native-asset": "^2.1.1",
//   "react-native-bouncy-checkbox": "^4.0.1",
//   "react-native-calendars": "^1.1305.0",
//   "react-native-collapsible": "^1.6.1",
//   "react-native-date-picker": "^5.0.4",
//   "react-native-dropdown-picker": "^5.4.6",
//   "react-native-dropdown-select-list": "^2.0.5",
//   "react-native-element-dropdown": "^2.12.0",
//   "react-native-elements": "^3.4.3",
//   "react-native-email": "^2.1.0",
//   "react-native-gesture-handler": "^2.16.2",
//   "react-native-keyboard-aware-scroll-view": "^0.9.5",
//   "react-native-linear-gradient": "^2.8.3",
//   "react-native-modal": "^13.0.1",
//   "react-native-multiple-select": "^0.5.12",
//   "react-native-pager-view": "^6.3.1",
//   "react-native-paper": "^5.12.3",
//   "react-native-radio-buttons-group": "^3.1.0",
//   "react-native-reanimated": "^3.11.0",
//   "react-native-safe-area-context": "^4.10.1",
//   "react-native-screens": "^3.31.1",
//   "react-native-skia-responsive-text": "^1.1.3",
//   "react-native-svg": "^15.3.0",
//   "react-native-svg-transformer": "^1.3.0",
//   "react-native-tab-navigator": "^0.3.4",
//   "react-native-tab-view": "^3.5.2",
//   "react-native-vector-icons": "^10.1.0",
//   "react-native-virtualized-view": "^1.0.0",
//   "react-redux": "^9.1.2",
//   "rn-keyboard-avoiding-view": "^1.0.5",
//   "victory-native": "^41.0.2"
// },

// "devDependencies": {
//   "@babel/core": "^7.20.0",
//   "@babel/preset-env": "^7.20.0",
//   "@babel/runtime": "^7.20.0",
//   "@react-native/eslint-config": "0.74.83",
//   "@react-native/metro-config": "0.74.83",
//   "@react-native/typescript-config": "0.74.83",
//   "@types/react": "^18.2.6",
//   "@types/react-test-renderer": "^18.0.0",
//   "babel-jest": "^29.6.3",
//   "eslint": "^8.19.0",
//   "jest": "^29.6.3",
//   "prettier": "2.8.8",
//   "react-test-renderer": "18.2.0",
//   "typescript": "5.0.4"
// },

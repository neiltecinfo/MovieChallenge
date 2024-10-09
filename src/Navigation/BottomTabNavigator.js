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
                Favourites
              </Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <FavMovieActive width={21} height={21} />
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
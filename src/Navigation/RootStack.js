// import { View, Text } from 'react-native'
// import React from 'react'
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import LoginScreen from '../Screens/StartingScreens/LoginScreen'
// import SignUpScreen from '../Screens/StartingScreens/SignUpScreen'
// import BottomTabNavigator from './BottomTabNavigator'
// const Stack = createNativeStackNavigator();

// const RootStack = () => {
//   return (
//     <Stack.Navigator initialRouteName='LoginScreen'>
//       <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }

// export default RootStack

import React, {createContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreens from './AuthScreens';
import NonAuthScreens from './NonAuthScreens';
import {useAuthContext} from '../Context/AuthenticationContext';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {isLogin, setIsLogin, loading} = useAuthContext();

  useEffect(() => {
    console.log('isLogin in RootStack is ', isLogin);
    console.log('loading in RootStack is ', loading);
  }, [isLogin, loading]);
  // Use isLogin value to determine which component to show

  // import the isLogged state from AuthenticationContext over here

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}
      
      >
      {isLogin ? (
        <Stack.Screen
          name="NonAuthScreens"
          component={NonAuthScreens}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="AuthScreens"
          component={AuthScreens}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;

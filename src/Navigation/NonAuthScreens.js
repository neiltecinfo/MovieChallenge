import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import BottomTabNavigator from './BottomTabNavigator'
import Details from '../Screens/DetailsTab/Details';

const NonAuthScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default NonAuthScreens
import React from 'react'
import LoginScreen from '../Screens/StartingScreens/LoginScreen'
import SignUpScreen from '../Screens/StartingScreens/SignUpScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


const AuthScreens = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AuthScreens
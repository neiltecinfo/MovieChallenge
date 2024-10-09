import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/Screens/StartingScreens/LoginScreen';
import SignUpScreen from './src/Screens/StartingScreens/SignUpScreen';
import BottomTabNavigator from './src/Navigation/BottomTabNavigator';
import { AuthProvider } from './src/Context/AuthenticationContext';

import {Provider} from 'react-redux';
import RootStack from './src/Navigation/RootStack';
import Store from './src/Redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>

        <AuthProvider>

          <RootStack />
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

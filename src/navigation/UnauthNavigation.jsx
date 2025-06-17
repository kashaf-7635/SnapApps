import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import {MainApp} from '../utils/constants/theme';
import GetStarted from '../screens/GetStarted';

const Stack = createNativeStackNavigator();
const UnauthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: MainApp.primary100},
        headerStyle: {backgroundColor: MainApp.primary500},
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Get Started" component={GetStarted} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default UnauthNavigation;

const s = StyleSheet.create({});

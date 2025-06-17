import Icon from '@react-native-vector-icons/entypo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {MainApp} from '../utils/constants/theme';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: MainApp.primary800,
        tabBarActiveBackgroundColor: MainApp.primary100,
        tabBarInactiveTintColor: MainApp.primary100,
        tabBarStyle: {
          backgroundColor: MainApp.primary500,
        },
        sceneStyle:{backgroundColor:MainApp.primary100}
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

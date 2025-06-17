import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Recent from '../screens/ExpenseTracker/Recent';
import AllExpenses from '../screens/ExpenseTracker/AllExpenses';
import Icon from '@react-native-vector-icons/entypo';
import Fonts from '../utils/constants/fonts';
import {Expense} from '../utils/constants/theme';

const Tab = createBottomTabNavigator();

const ExpenseTrackerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: Expense.primary500,
          height: 80,
        },
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: 20,
          fontFamily: Fonts.sansation.bold,
        },
        tabBarActiveTintColor: Expense.accent500,
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Recent') {
            iconName = 'back-in-time';
          } else if (route.name === 'AllExpenses') {
            iconName = 'calendar';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        sceneStyle: {
          backgroundColor: Expense.primary800,
        },
        headerStyle: {
          backgroundColor: Expense.primary500,
        },
        headerTintColor: Expense.primary100,
      })}>
      <Tab.Screen
        name="Recent"
        component={Recent}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{title: 'All Expenses'}}
      />
    </Tab.Navigator>
  );
};

export default ExpenseTrackerTabs;

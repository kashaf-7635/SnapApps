import Icon from '@react-native-vector-icons/entypo';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useLayoutEffect, useState} from 'react';
import BottomTabs from './BottomTabs';
import AddGoal from '../screens/AddGoal';
import GuessNumber from '../screens/GuessNumber';
import MealsAppStack from './MealsAppStack';
import ExpenseTrackerTabs from './ExpenseTrackerTabs';
import {TouchableOpacity} from 'react-native';
import LogoutCmp from '../components/LogoutCmp';
import FavPlacesStack from './FavPlacesStack';
import {MainApp} from '../utils/constants/theme';
import {useRequest} from '../hooks/useRequest';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../utils/axios/user';
import LoadingOverlay from '../components/LoadingCmp';
import {addUser} from '../store/redux/userSlice';
import {getUid} from '../utils/helpers/async-storage';

const Drawer = createDrawerNavigator();
const MainAppDrawer = ({isLoading}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.auth.user);

  if (isLoading) {
    <LoadingOverlay />;
  }

  return (
    <>
      <Drawer.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: MainApp.primary500,
          },
          headerTintColor: MainApp.primary100,
          drawerActiveBackgroundColor: MainApp.primary100,
          drawerActiveTintColor: MainApp.primary800,
          drawerInactiveTintColor: MainApp.primary100,
          drawerStyle: {
            backgroundColor: MainApp.primary500,
          },
        }}>
        <Drawer.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            title: `Welcome ${user ? user.name : ''}!`,
            drawerLabel: 'Home',
            drawerIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerRight: ({tintColor}) => {
              return (
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() => setModalVisible(true)}>
                  <Icon name="log-out" color={tintColor} size={20} />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Drawer.Screen
          name="AddGoal"
          component={AddGoal}
          options={{
            headerShown: false,
            drawerLabel: 'Add Goal',
            drawerIcon: ({color, size}) => (
              <Icon name="medal" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="GuessNumber"
          component={GuessNumber}
          options={{
            headerShown: false,
            drawerLabel: 'Guess Number',
            drawerIcon: ({color, size}) => (
              <Icon name="game-controller" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Meals"
          component={MealsAppStack}
          options={{
            headerShown: false,
            drawerLabel: 'Meal Recipes',
            drawerIcon: ({color, size}) => (
              <Icon name="bowl" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ExpenseTracker"
          component={ExpenseTrackerTabs}
          options={{
            headerShown: false,
            drawerLabel: 'Expense Tracker',
            drawerIcon: ({color, size}) => (
              <Icon name="bar-graph" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="FavPlaces"
          component={FavPlacesStack}
          options={{
            headerShown: false,
            drawerLabel: 'Favorite Places',
            drawerIcon: ({color, size}) => (
              <Icon name="location" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>

      <LogoutCmp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default MainAppDrawer;

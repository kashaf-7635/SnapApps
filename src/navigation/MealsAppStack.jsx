import Icon from '@react-native-vector-icons/entypo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable} from 'react-native';
import MealsOverviewScreen from '../screens/Meals/MealsOverviewScreen';
import MealDetailsScreen from '../screens/Meals/MealDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MealCategories from '../screens/Meals';
import Favourites from '../screens/Meals/Favourites';
import {Meals} from '../utils/constants/theme';
// import FavouriteContextProvider from '../store/context/Meals/favourite-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MealCategoryTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Meals.primary800,
        tabBarActiveBackgroundColor: Meals.primary100,
        tabBarStyle: {
          backgroundColor: Meals.primary800,
        },
        sceneStyle: {backgroundColor: Meals.primary700},
      }}>
      <Tab.Screen
        name="MealCategories"
        component={MealCategories}
        options={{
          title: 'All Categories',
          tabBarIcon: ({color, size}) => (
            <Icon name="air" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          title: 'Favourites',
          tabBarIcon: ({color, size}) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MealsAppStack = ({navigation}) => {
  return (
    // <FavouriteContextProvider>

    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Meals.primary700},
        headerStyle: {backgroundColor: Meals.primary800},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="MealCategoriesTab"
        component={MealCategoryTab}
        options={{
          title: 'Meal Recipes App',
          headerLeft: ({tintColor}) => (
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{marginRight: 10}}>
              <Icon name="menu" size={30} color={tintColor} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
    </Stack.Navigator>

    // </FavouriteContextProvider>
  );
};

export default MealsAppStack;

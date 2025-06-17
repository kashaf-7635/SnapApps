import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlaces from '../screens/FavPlaces/AllPlaces';
import {Pressable} from 'react-native';
import Icon from '@react-native-vector-icons/entypo';
import PlaceDetails from '../screens/FavPlaces/PlaceDetails';
import AddPlace from '../screens/FavPlaces/AddPlace';
import {PlaceTheme} from '../utils/constants/theme';
import Map from '../screens/FavPlaces/Map';

const Stack = createNativeStackNavigator();
const FavPlacesStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: PlaceTheme.gray700},
        headerStyle: {backgroundColor: PlaceTheme.primary500},
        headerTintColor: PlaceTheme.gray700,
        headerLeft: ({tintColor}) => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{marginRight: 10}}>
            <Icon name="menu" size={30} color={tintColor} />
          </Pressable>
        ),
      }}>
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({navigation}) => ({
          title: 'Your Favorite Places',
          headerRight: ({tintColor}) => (
            <Pressable
              onPress={() => navigation.navigate('AddPlace')}
              style={{marginRight: 10}}>
              <Icon name="plus" size={30} color={tintColor} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: 'Add a new Place',
        }}
      />
       <Stack.Screen name="MapScreen" component={Map} 
       
         options={{
          title: 'Pick your location..',
        }}/>
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} 
        options={{
          title: 'Place loading..',
        }}/>
    </Stack.Navigator>
  );
};

export default FavPlacesStack;

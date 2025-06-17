import {
  Alert,
  Linking,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OutlinedButton from '../ui/OutlinedButton';

import Geolocation from '@react-native-community/geolocation';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTheme} from '../../../utils/constants/theme';
import {useDispatch} from 'react-redux';
import {setLocation} from '../../../store/redux/placesSlices';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (
      granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      granted === PermissionsAndroid.RESULTS.DENIED
    ) {
      Alert.alert(
        'Permission Denied',
        'You have permanently denied location permission. Please enable it from app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
      return false;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const LocationPicker = ({}) => {
  const [isLocating, setIsLocating] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      dispatch(setLocation(route.params));
    }
  }, [route, isFocused]);

  const getLocationHandler = async () => {
    const result = await requestLocationPermission();

    if (result) {
      setIsLocating(true);
      Geolocation.getCurrentPosition(
        position => {
          setIsLocating(false);
          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          );
        },
        error => {
          setIsLocating(false);
          console.log(error);

          console.log(error.code, error.message);
          dispatch(setLocation(false));
        },
        {
          enableHighAccuracy: true,
          // timeout: 15000,
          // maximumAge: 10000,
        },
      );
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate('MapScreen');
  };
  return (
    <View>
      <View style={s.actions}>
        <OutlinedButton onPress={getLocationHandler} icon={'location'}>
          {isLocating ? 'Locating....' : 'Locate User'}
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon={'map'}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const s = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PlaceTheme.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

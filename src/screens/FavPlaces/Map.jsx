import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import ModalMessage from '../../components/ModalMessage';
import Icon from '@react-native-vector-icons/entypo';

const Map = ({navigation, route}) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState();

  useEffect(() => {
    if (route?.params) {
      setInitialRegion({
        latitude: route?.params?.lat,
        longitude: route?.params?.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setSelectedLocation(route?.params);
      navigation.setOptions({
        title: 'Map',
      });
    }
  }, [route]);

  const selectLocationHandler = event => {
    if (route?.params) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({lat, lng});
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      ModalMessage(
        'No Location Picked',
        'You should pick a location by tapping on map first!',
        'warning',
      );
      return;
    }

    navigation.navigate('AddPlace', selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (route?.params) {
      return;
    }
    navigation.setOptions({
      headerRight: ({tintColor}) => {
        return (
          <Pressable onPress={savePickedLocationHandler}>
            <Icon name="save" size={30} color={tintColor} />
          </Pressable>
        );
      },
    });
  }, [navigation, savePickedLocationHandler, route]);
  return (
    <View style={s.container}>
      <MapView
        style={s.map}
        region={initialRegion}
        onPress={selectLocationHandler}>
        {selectedLocation && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

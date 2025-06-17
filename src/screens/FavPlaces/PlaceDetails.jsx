import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OutlinedButton from '../../components/FavPlaces/ui/OutlinedButton';
import {PlaceTheme} from '../../utils/constants/theme';
import Fonts from '../../utils/constants/fonts';
import {useRequest} from '../../hooks/useRequest';
import {
  deletePlaceItem,
  fetchPlaceDetails,
} from '../../utils/database/places-db';
import LoadingOverlay from '../../components/FavPlaces/LoadingOverlay';

const PlaceDetails = ({route, navigation}) => {
  const [place, setPlace] = useState({});
  const showOnMapHandler = () => {
    navigation.navigate('MapScreen', place?.location);
  };

  const selectedId = route?.params.placeId;

  const {isLoading, requestHandler} = useRequest();

  useEffect(() => {
    requestHandler({
      requestFn: () => fetchPlaceDetails(selectedId),
      onSuccess: async res => {
        setPlace(res);
        navigation.setOptions({
          title: place?.title,
        });
      },
    });
  }, [selectedId, place?.title]);

  const deletePlaceHandler = () => {
    requestHandler({
      requestFn: () => deletePlaceItem(selectedId),
      onSuccess: async res => {
        navigation.navigate('AllPlaces');
      },
      successMessage: 'Place Deleted Successfully!',
    });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <ScrollView style={{flex: 1}}>
      <View style={s.main}>
        <Image style={s.image} source={{uri: place?.imageUri}} />

        <View style={s.location}>
          <View style={s.addressContainer}>
            <Text style={s.address}>{place?.address}</Text>
          </View>
          <OutlinedButton icon={'map'} onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
          <OutlinedButton icon={'trash'} onPress={deletePlaceHandler}>
            Delete this Place
          </OutlinedButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const s = StyleSheet.create({
  main: {
    flexGrow: 1,
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  location: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: PlaceTheme.primary500,
    textAlign: 'center',
    fontFamily: Fonts.sansation.bold,
    fontSize: 16,
  },
});

import {StyleSheet} from 'react-native';
import React from 'react';
import PlaceForm from '../../components/FavPlaces/places/PlaceForm';
import {insertPlace} from '../../utils/database/places-db';
import {useRequest} from '../../hooks/useRequest';
import LoadingOverlay from '../../components/FavPlaces/LoadingOverlay';

const AddPlace = ({navigation}) => {
  const {isLoading, requestHandler} = useRequest();
  const addPlaceHandler = async place => {
    requestHandler({
      requestFn: () => insertPlace(place),
      successMessage: 'Place Inserted!',
      onSuccess: async res => {
        console.log(res);
        navigation.navigate('AllPlaces');
      },
      errorMessage: 'Insert failed',
    });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <PlaceForm onCreatePlace={addPlaceHandler} />
    </>
  );
};

export default AddPlace;

const s = StyleSheet.create({});

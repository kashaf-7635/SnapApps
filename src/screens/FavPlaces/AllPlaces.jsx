import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import PlacesList from '../../components/FavPlaces/places/PlacesList';
import {useIsFocused} from '@react-navigation/native';
import LoadingOverlay from '../../components/LoadingCmp';
import {fetchPlaces, init} from '../../utils/database/places-db';
import {useRequest} from '../../hooks/useRequest';

const AllPlaces = ({}) => {
  const [dbLoaded, setDbLoaded] = useState(false);
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();
  const {isLoading, requestHandler} = useRequest();

  useEffect(() => {
    const setupDB = async () => {
      try {
        await init();
        console.log('DB initialized');
        setDbLoaded(true);
      } catch (e) {
        console.log('DB init failed', e);
      }
    };

    setupDB();
  }, []);

  useEffect(() => {
    if (isFocused) {
      requestHandler({
        requestFn: () => fetchPlaces(),
        onSuccess: async res => {
          console.log(res);
          setPlaces(res);
        },
      });
    }
  }, [isFocused]);

  if (!dbLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <PlacesList places={places} />
    </>
  );
};

export default AllPlaces;

const s = StyleSheet.create({});

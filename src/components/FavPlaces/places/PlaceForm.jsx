import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Fonts from '../../../utils/constants/fonts';
import {PlaceTheme} from '../../../utils/constants/theme';
import ImagePicker from './ImagePicker';
import OutlinedButton from '../ui/OutlinedButton';
import LocationPicker from './LocationPicker';
import ButtonCmp from '../ui/ButtonCmp';
import {getAddress, getMapPreview} from '../../../utils/axios/location';
import Place from '../../../models/places';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetForm,
  setAddress,
  setTitle,
} from '../../../store/redux/placesSlices';

const PlaceForm = ({onCreatePlace}) => {
  const refImagePicker = useRef();
  const dispatch = useDispatch();
  const {title, imageUri, location, address} = useSelector(
    state => state.placeForm,
  );

  useEffect(() => {
    const fetchAddress = async () => {
      if (location.lat && location.lng) {
        try {
          const addressStr = await getAddress(location.lat, location.lng);
          dispatch(setAddress(addressStr));
        } catch (error) {
          console.error('Failed to fetch address:', error);
        }
      }
    };

    fetchAddress();
  }, [location]);

  const savePlaceHandler = () => {
    const placeData = new Place(title, imageUri, address, location);
    onCreatePlace(placeData);
    dispatch(resetForm());
  };
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={s.form}>
          <View style={s.innerContainer}>
            <Text style={s.label}>Title</Text>
            <TextInput
              style={s.input}
              value={title}
              onChangeText={text => dispatch(setTitle(text))}
            />
          </View>

          <View style={s.innerContainer}>
            <View style={s.imageContainer}>
              <Image
                style={s.image}
                source={
                  imageUri
                    ? {uri: imageUri}
                    : require('../../../assets/placeholder.png')
                }
              />
            </View>
            <OutlinedButton onPress={() => refImagePicker.current.open()}>
              Add New Image
            </OutlinedButton>
          </View>
          <View style={s.innerContainer}>
            <View style={s.imageContainer}>
              <Image
                style={s.image}
                source={
                  location.lat && location.lng
                    ? {uri: getMapPreview(location.lat, location.lng)}
                    : require('../../../assets/placeholder_location.png')
                }
              />
            </View>
            <LocationPicker />
          </View>
          <View style={s.innerContainer}>
            <Text style={s.label}>Address:</Text>
            <TextInput
              style={[s.input, s.multiline]}
              value={address}
              multiline
              editable={false}
            />
          </View>

          <View style={s.innerContainer}>
            <ButtonCmp onPress={savePlaceHandler}>Add Place</ButtonCmp>
          </View>

          <ImagePicker refRBSheet={refImagePicker} />
        </View>
      </ScrollView>
    </>
  );
};

export default PlaceForm;

const s = StyleSheet.create({
  form: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 80,
  },
  innerContainer: {
    paddingVertical: 12,
  },
  label: {
    fontFamily: Fonts.sansation.bold,
    marginBottom: 4,
    color: PlaceTheme.primary500,
  },
  input: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: PlaceTheme.primary700,
    borderBottomWidth: 2,
    backgroundColor: PlaceTheme.primary100,
  },
  imageContainer: {
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
    height: '100%',
    width: '100%',
  },
  addressText: {
    color: 'white',
  },
  multiline: {
    verticalAlign: 'top',
  },
});

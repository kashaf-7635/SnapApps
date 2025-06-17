import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PlaceTheme} from '../../../utils/constants/theme';
import Fonts from '../../../utils/constants/fonts';

const PlaceItem = ({place, onSelect}) => {
  const {imageUri, title, address, id} = place;

  return (
    <>
      <Pressable
        onPress={onSelect.bind(this, id)}
        style={({pressed}) => [s.item, pressed && s.pressed]}>
        <Image source={{uri: imageUri}} style={s.image} />
        <View style={s.info}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.address}>{address}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default PlaceItem;

const s = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: PlaceTheme.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    width: '100%',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontFamily: Fonts.sansation.bold,
    fontSize: 18,
    color: PlaceTheme.gray700,
  },
  address: {
    fontFamily: Fonts.sansation.regular,
    fontSize: 12,
    color: PlaceTheme.gray700,
  },
});

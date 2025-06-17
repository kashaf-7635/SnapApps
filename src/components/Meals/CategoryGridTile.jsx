import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';

const CategoryGridTile = ({title, color, onPress}) => {
  return (
    <View style={s.gridItem}>
      <Pressable
      onPress={onPress}
        android_ripple={{color: '#ccc'}}
        style={({pressed}) => [s.button, pressed ? s.buttonPressed : null]}>
        <View style={[s.innerContainer, {backgroundColor:color}]}>
          <Text style={s.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const s = StyleSheet.create({
  gridItem: {
    width: deviceWidth / 2 - 20,
    margin: 8,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily:Fonts.poppins.bold,
  },
});

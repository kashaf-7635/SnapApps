import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PlaceTheme} from '../../../utils/constants/theme';

const ButtonCmp = ({onPress, children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [s.button, pressed && s.pressed]}>
      <Text style={s.text}>{children}</Text>
    </Pressable>
  );
};

export default ButtonCmp;

const s = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: PlaceTheme.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: PlaceTheme.primary50,
  },
});

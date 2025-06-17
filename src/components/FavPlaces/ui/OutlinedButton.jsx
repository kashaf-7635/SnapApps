import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/entypo';
import {PlaceTheme} from '../../../utils/constants/theme';
import Fonts from '../../../utils/constants/fonts';

const OutlinedButton = ({onPress, icon, children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [s.button, pressed && s.pressed]}>
      <Icon
        name={icon}
        size={18}
        color={PlaceTheme.primary500}
        style={s.icon}
      />
      <Text style={s.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const s = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PlaceTheme.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: PlaceTheme.primary500,
    fontFamily: Fonts.poppins.regular,
  },
});

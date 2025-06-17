import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import {MainApp} from '../../utils/constants/theme';

const ButtonCmp = ({children, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity style={[s.container, style]} onPress={onPress}>
      <Text style={[s.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCmp;

const s = StyleSheet.create({
  container: {
    backgroundColor: MainApp.primary500,
    padding: 10,
    width: '100%',
    marginHorizontal: 6,
    marginVertical: 10,
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontFamily: Fonts.montserrat.bold,
    fontSize: 18,
    textAlign: 'center',
  },
});

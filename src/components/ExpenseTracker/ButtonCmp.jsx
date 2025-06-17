import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import { Expense } from '../../utils/constants/theme';

const ButtonCmp = ({children, style, onPress, textStyle}) => {
  return (
    <TouchableOpacity style={[s.btn, style]} onPress={onPress}>
      <Text style={[s.btnText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCmp;

const s = StyleSheet.create({
  btn: {
    backgroundColor: Expense.primary500,
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.sansation.bold,
  },
});

import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import { Expense } from '../../utils/constants/theme';

const InputCmp = ({textInputConfig, invalid}) => {
  const inputStyles = [s.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(s.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(s.invalidInput);
  }
  return <TextInput {...textInputConfig} style={inputStyles} />;
};

export default InputCmp;

const s = StyleSheet.create({
  input: {
    backgroundColor: Expense.primary100,
    borderRadius: 6,
    marginVertical: 5,
    padding: 10,
    paddingVertical: 15,
    fontFamily: Fonts.sansation.bold,
    fontSize: 15,
    color: Expense.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidInput: {
    borderColor: '#db4f4f',
    borderWidth:2,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import {Expense} from '../../utils/constants/theme';

const TitleCmp = ({duration, amount}) => {
  return (
    <View style={s.titleView}>
      <View>
        <Text style={s.titleText}>{duration}</Text>
      </View>
      <View>
        <Text style={s.titleText}>{amount} $</Text>
      </View>
    </View>
  );
};

export default TitleCmp;

const s = StyleSheet.create({
  titleView: {
    backgroundColor: Expense.primary100,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  titleText: {
    color: Expense.primary700,
    fontSize: 20,
    fontFamily: Fonts.poppins.bold,
  },
});

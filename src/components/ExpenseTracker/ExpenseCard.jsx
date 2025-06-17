import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import {Expense} from '../../utils/constants/theme';

const ExpenseCard = ({description, amount, date, onPress}) => {
  return (
    <>
      <TouchableOpacity style={s.main} onPress={onPress}>
        <View style={s.infoView}>
          <Text style={s.tileText}>{description}</Text>
          <Text style={s.dateText}>{date}</Text>
        </View>
        <View style={s.amountView}>
          <View style={s.btn}>
            <Text style={s.btnText}>{amount} $</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ExpenseCard;

const s = StyleSheet.create({
  main: {
    backgroundColor: Expense.primary500,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
    overflow: 'hidden',
  },
  tileText: {
    color: 'white',
    fontFamily: Fonts.sansation.bold,
    fontSize: 20,
    marginBottom: 10,
  },
  dateText: {
    color: 'white',
    fontFamily: Fonts.sansation.regular,
    fontSize: 15,
  },
  amountView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: Expense.primary100,
    padding: 15,
    borderRadius: 15,
  },
  btnText: {
    color: Expense.primary700,
    fontFamily: Fonts.sansation.bold,
    fontSize: 20,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleCmp from '../../components/ExpenseTracker/TitleCmp';
import ListDisplay from '../../components/ExpenseTracker/ListDisplay';
import { useSelector } from 'react-redux';

const AllExpenses = () => {
  const expenses = useSelector(state => state.expTracking.expenses) || [];
  const expensesTotal = expenses.reduce((sum, curr) => {
    return (sum += parseInt(curr.amount));
  }, 0);
  return (
    <View style={s.main}>
      <TitleCmp duration="Total" amount={expensesTotal} />
      <ListDisplay expenses={expenses} />
    </View>
  );
};

export default AllExpenses;

const s = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
});

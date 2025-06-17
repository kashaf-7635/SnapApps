import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListDisplay from '../../components/ExpenseTracker/ListDisplay';
import TitleCmp from '../../components/ExpenseTracker/TitleCmp';
import {getDateMinusDays} from '../../utils/helpers/date';
import {getExpenses} from '../../utils/axios/expense';
import {setExpenses} from '../../store/redux/expenseTrackingSlice';
import LoadingOverlay from '../../components/ExpenseTracker/LoadingOverlay';
import {useRequest} from '../../hooks/useRequest';

const Recent = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expTracking.expenses) || [];
  const {isLoading, requestHandler} = useRequest();

  useEffect(() => {
    requestHandler({
      requestFn: () => getExpenses(),
      onSuccess: async res => {
        dispatch(setExpenses(res));
      },
    });
  }, [dispatch]);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    const expDate = new Date(expense.date);
    return expDate >= date7DaysAgo;
  });
  const expensesTotal = recentExpenses.reduce((sum, curr) => {
    return (sum += curr.amount);
  }, 0);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <View style={s.main}>
        <TitleCmp duration="Last 7 Days" amount={expensesTotal} />
        <ListDisplay expenses={recentExpenses} />
      </View>
    </>
  );
};

export default Recent;

const s = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
});

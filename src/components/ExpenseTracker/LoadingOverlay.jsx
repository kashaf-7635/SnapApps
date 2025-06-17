import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {Expense} from '../../utils/constants/theme';

const LoadingOverlay = () => {
  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingOverlay;

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Expense.primary800,
  },
});

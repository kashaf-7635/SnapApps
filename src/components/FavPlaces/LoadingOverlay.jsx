import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {PlaceTheme} from '../../utils/constants/theme';

const LoadingOverlay = () => {
  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color={PlaceTheme.primary100} />
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
    backgroundColor: PlaceTheme.primary800,
  },
});

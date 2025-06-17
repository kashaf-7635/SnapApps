import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Meals } from '../../../utils/constants/theme';

const Subtitle = ({children}) => {
  return (
    <View style={s.subtitleContainer}>
      <Text style={s.subtitle}>{children}</Text>
    </View>
  );
};

export default Subtitle;

const s = StyleSheet.create({
    subtitleContainer: {
        marginVertical: 4,
        marginHorizontal: 12,
        padding: 6,
        borderBottomColor: Meals.primary100,
        borderBottomWidth: 2,
      },
      subtitle: {
        color: Meals.primary100,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

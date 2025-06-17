import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MealDetails = ({
  duration,
  complexity,
  affordability,
  style,
  textStyle,
}) => {
  return (
    <View style={[s.details, style]}>
      <Text style={[s.detailItem, textStyle]}>{duration}m</Text>
      <Text style={[s.detailItem, textStyle]}>{complexity?.toUpperCase()}</Text>
      <Text style={[s.detailItem, textStyle]}>
        {affordability?.toUpperCase()}
      </Text>
    </View>
  );
};

export default MealDetails;

const s = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Meals} from '../../../utils/constants/theme';

const List = ({data}) => {
  return (
    <>
      {data?.map((item, idx) => (
        <View style={s.listItem} key={idx}>
          <Text style={s.itemText}>{item}</Text>
        </View>
      ))}
    </>
  );
};

export default List;

const s = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: Meals.primary100,
  },
  itemText: {
    color: Meals.primary800,
    textAlign: 'center',
  },
});

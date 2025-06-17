import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import MealItem from './MealItem';

const MealsList = ({items}) => {
  const renderMealItem = ({item}) => {
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageURL: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  };

  return (
    <View style={s.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsList;

const s = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
  });

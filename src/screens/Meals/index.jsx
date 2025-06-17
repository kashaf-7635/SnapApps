import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {CATEGORIES} from '../../data/dummy-data';
import CategoryGridTile from '../../components/Meals/CategoryGridTile';
import Icon from '@react-native-vector-icons/entypo';

const MealCategories = ({navigation}) => {
  const renderCategoryItem = ({item}) => {
    return (
      <CategoryGridTile
        title={item?.title}
        color={item?.color}
        onPress={() =>
          navigation.navigate('MealsOverview', {
            categoryId: item?.id,
          })
        }
      />
    );
  };

  return (
    <>
      <View style={s.main}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
        />
      </View>
    </>
  );
};

export default MealCategories;

const s = StyleSheet.create({
  main: {
    flex: 1,
  },
});

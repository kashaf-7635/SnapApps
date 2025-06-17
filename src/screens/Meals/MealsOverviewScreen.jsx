import React, {useLayoutEffect} from 'react';
import {MEALS, CATEGORIES} from '../../data/dummy-data';
import MealsList from '../../components/Meals/MealsList';

const MealsOverviewScreen = ({navigation, route}) => {
  const {categoryId} = route?.params;

  const displayedMeals = MEALS.filter(mealItem => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      category => category.id === categoryId,
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  return <MealsList items={displayedMeals}/>
  
};

export default MealsOverviewScreen;



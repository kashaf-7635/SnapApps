import {StyleSheet, View, Text} from 'react-native';
import React, {useContext} from 'react';
import MealsList from '../../components/Meals/MealsList';
// import {FavouriteContext} from '../../store/context/Meals/favourite-context';
import {MEALS} from '../../data/dummy-data';
import Fonts from '../../utils/constants/fonts';
import {useSelector} from 'react-redux';

const Favourites = () => {
  //   const favContext = useContext(FavouriteContext);
  const favMealsIds = useSelector(state => state.favMeals.ids);
  const favMeals = MEALS.filter(meal => favMealsIds.includes(meal.id));

  if (favMeals.length === 0) {
    return (
      <View style={s.rootContainer}>
        <Text style={s.text}>You have no favourite meals yet!</Text>
      </View>
    );
  }
  return <MealsList items={favMeals} />;
};

export default Favourites;

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.opensans.bold,
    color: 'white',
  },
});

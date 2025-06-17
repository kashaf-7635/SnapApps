import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {MEALS} from '../../data/dummy-data';
import MealDetails from '../../components/Meals/MealDetails';
import Fonts from '../../utils/constants/fonts';
import Subtitle from '../../components/Meals/MealDetail/Subtitle';
import List from '../../components/Meals/MealDetail/List';
import IconButton from '../../components/Meals/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import { addFavourites, removeFavourites } from '../../store/redux/favMealsSlice';

// import {FavouriteContext} from '../../store/context/Meals/favourite-context';

const MealDetailsScreen = ({route, navigation}) => {
  // const favContext = useContext(FavouriteContext);
  const dispatch = useDispatch();
  const favMealIds = useSelector(state => state.favMeals.ids);

  const {mealId} = route?.params;
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const {
    imageUrl,
    title,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
  } = selectedMeal;

  const isFav = favMealIds.includes(mealId);
  const changeFavStatusHandler = () => {
    if (isFav) {
      dispatch(removeFavourites(mealId));
      // favContext.removeFavourite(mealId);
    } else {
      // favContext.addFavourite(mealId);
      dispatch(addFavourites(mealId));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={!isFav ? 'star-outlined' : 'star'}
            color="white"
            onPress={changeFavStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavStatusHandler]);

  return (
    <ScrollView style={s.rootContainer}>
      <Image style={s.image} source={{uri: imageUrl}} />
      <Text style={s.title}>{title} </Text>
      <MealDetails
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        textStyle={s.detailsItem}
      />
      <View style={s.listOuter}>
        <View style={s.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailsScreen;

const s = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.poppins.bold,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailsItem: {
    color: 'white',
  },
  listContainer: {
    maxWidth: '80%',
  },
  listOuter: {
    alignItems: 'center',
  },
});

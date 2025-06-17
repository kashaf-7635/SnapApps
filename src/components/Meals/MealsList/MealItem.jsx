import {Image, Pressable, StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import Fonts from '../../../utils/constants/fonts';
import {useNavigation} from '@react-navigation/native';
import MealDetails from '../MealDetails';

const MealItem = ({
  id,
  title,
  imageURL,
  duration,
  complexity,
  affordability,
}) => {
  const navigation = useNavigation();
  return (
    <View style={s.mealItem}>
      <Pressable
        onPress={() =>
          navigation.navigate('MealDetails', {
            mealId: id,
          })
        }
        android_ripple={{color: '#ccc'}}
        style={({pressed}) => (pressed ? s.buttonPressed : null)}>
        <View style={s.innerContainer}>
          <View>
            <Image style={s.image} source={{uri: imageURL}} />
            <Text style={s.title}>{title}</Text>
          </View>
         <MealDetails duration={duration} complexity={complexity} affordability={affordability}/>
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const s = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontFamily: Fonts.poppins.bold,
    fontSize: 18,
    textAlign: 'center',
  },

});

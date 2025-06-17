import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {AddGoalTheme} from '../../utils/constants/theme';

const GoalItem = props => {
  return (
    <View style={styles.goalItemContainer}>
      <Pressable
        android_ripple={{color: AddGoalTheme.primary500}}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({pressed}) => pressed && styles.pressedItem}>
        <Text style={styles.goalItem}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItemContainer: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: AddGoalTheme.primary500,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalItem: {
    color: 'white',
    padding: 8,
  },
});

import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Modal, Image} from 'react-native';
import {AddGoalTheme} from '../../utils/constants/theme';

const GoalInput = props => {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const goalInputHandler = enteredText => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText('');
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/AddGoal/goal.png')}
        />
        <TextInput
          value={enteredGoalText}
          onChangeText={goalInputHandler}
          style={styles.textInput}
          placeholder="Your course goal!"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              color={AddGoalTheme.primary500}
              title="ADD GOAL"
              onPress={addGoalHandler}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={AddGoalTheme.accent800}
              title="Cancel"
              onPress={props.onCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: AddGoalTheme.primary800,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: AddGoalTheme.primary100,
    width: '100%',
    padding: 16,
    backgroundColor: AddGoalTheme.primary100,
    color: AddGoalTheme.primary800,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});

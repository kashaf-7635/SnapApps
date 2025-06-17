import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GoalInput from '../../components/AddGoal/GoalInput';
import GoalItem from '../../components/AddGoal/GoalItem';
import Icon from '@react-native-vector-icons/entypo';
import { AddGoalTheme } from '../../utils/constants/theme';

const AddGoal = ({navigation}) => {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const addGoalHandler = enteredGoalText => {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  };
  const startAddGoalHandler = () => {
    setIsVisible(true);
  };
  const endAddGoalHandler = () => {
    setIsVisible(false);
  };

  const deleteGoalHandler = id => {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(goal => goal.id !== id);
    });
  };
  return (
    <>
      <View style={styles.appContainer}>
        <View style={styles.menu}>
          <View style={styles.menuInner}>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{marginLeft: 10}}>
              <Icon name="menu" size={30} color="white" />
            </Pressable>
          </View>
          <View style={styles.menuInnerBtn}>
            <Button
              onPress={startAddGoalHandler}
              title="Add New Goal"
              color={AddGoalTheme.primary500}
            />
          </View>
        </View>

        <GoalInput
          visible={isVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={itemData => {
              return (
                <GoalItem
                  onDeleteItem={deleteGoalHandler}
                  text={itemData.item.text}
                  id={itemData.item.id}
                />
              );
            }}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    backgroundColor: '#1e085a',
  },
  menu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuInner: {
    flex: 1,
   
  },
  menuInnerBtn: {
    flex: 4,
  },
  goalsContainer: {
    flex: 4,
  },
});

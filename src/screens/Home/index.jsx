import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import {MainApp} from '../../utils/constants/theme';

const Home = ({navigation}) => {
  const modules = [
    {
      title: 'JavaScript Basics & Advanced',
      items: [
        'Season 1 (JS Basics)',
        'Season 2 (Advanced JS)',
        'Evaluation Test',
      ],
    },
    {
      title: 'Data Structures & Algorithms',
      items: ['DSA Practice', '50 Easy LeetCode Problems'],
    },
    {
      title: 'React Native Projects',
      items: [
        {name: 'Add Goals App', screen: 'AddGoal'},
        {name: 'Guess My Number', screen: 'GuessNumber'},
        {name: 'Meals Recipe App', screen: 'Meals'},
        {name: 'Expense Tracker App', screen: 'ExpenseTracker'},
        {name: 'Favourite Places', screen: 'FavPlaces'},
      ],
    },
    {
      title: 'React Native Concepts Covered',
      items: [
        'Navigation (Stack, Tabs, Drawer)',
        'Redux & Context API',
        'Firebase CRUD Operations',
        'User Input Handling',
        'AsyncStorage & Token Auth',
        'SQLite Integration',
        'Expo vs CLI Workflow',
        'App Publishing Prep',
      ],
    },
  ];

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.header}>SnapApps</Text>
        <Text style={styles.subHeader}>My React Native Learning Journey</Text>

        {modules.map((module, index) => (
          <View key={index} style={styles.moduleCard}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            {module.items.map((item, i) => {
              if (typeof item === 'string') {
                return (
                  <Text key={i} style={styles.textItem}>
                    • {item}
                  </Text>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.appButton}
                    onPress={() => navigation.navigate(item.screen)}>
                    <Text style={styles.appButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    fontSize: 32,
    fontFamily: Fonts.montserrat.bold,
    color: MainApp.primary800,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontFamily: Fonts.opensans.regular,
    color: '#555',
    marginBottom: 20,
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontFamily: Fonts.poppins.bold,
    color: MainApp.primary500,
    marginBottom: 12,
  },
  textItem: {
    fontSize: 14,
    fontFamily: Fonts.opensans.regular,
    color: '#444',
    marginVertical: 3,
    paddingLeft: 8,
  },
  appButton: {
    backgroundColor: MainApp.primary500,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  appButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.opensans.bold,
    textAlign: 'center',
  },
});

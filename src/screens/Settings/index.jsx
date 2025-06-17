import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import PushNotificationService from '../../utils/notifications/notificationService';
import Fonts from '../../utils/constants/fonts';
import {MainApp} from '../../utils/constants/theme';

const Settings = () => {
  const showLocalNotification = () => {
    PushNotificationService.showLocalNotification(
      'Stay Consistent!',
      'Time to practice your coding goals!',
    );
  };

  const showScheduledLocalNotification = () => {
    const date = new Date(Date.now() + 10 * 1000); 
    PushNotificationService.scheduleLocalNotification(
      'Hydration Break',
      'Drink some water and stretch!',
      date
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Settings</Text>
      <Text style={styles.subTitle}>Notification Preferences</Text>

      <Text style={styles.description}>
        Enable reminders to stay consistent with your learning, track progress, or take breaks.
      </Text>

      <TouchableOpacity style={styles.button} onPress={showLocalNotification}>
        <Text style={styles.buttonText}>Send Instant Reminder</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.scheduledButton]}
        onPress={showScheduledLocalNotification}
      >
        <Text style={styles.buttonText}>Schedule Reminder (10s)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainApp.primary100,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.montserrat.bold,
    color: MainApp.primary800,
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: Fonts.poppins.bold,
    color: MainApp.primary500,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.opensans.regular,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  button: {
    backgroundColor: MainApp.primary500,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  scheduledButton: {
    backgroundColor: MainApp.error500,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.opensans.bold,
  },
});

import {Platform, PermissionsAndroid, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

class PushNotificationService {
  constructor() {
    this.init();
  }

  async init() {
    await this.requestSystemPermission();
    this.createDefaultChannel();
    this.listenForForegroundMessages();
  }

  async requestSystemPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission required',
          'Please enable notifications in settings.',
        );
      }
    }

    const status = await requestPermission(getMessaging(getApp()));
    const enabled =
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Firebase notification permission granted.');
    } else {
      console.warn('Firebase permission denied.');
    }
  }

  async getDeviceToken() {
    try {
      const token = await getToken(getMessaging(getApp()));
      console.log('FCM Device Token:', token);
      return token;
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  }

  createDefaultChannel() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
        channelDescription: 'General notifications',
        importance: 4,
        vibrate: true,
      },
      created => console.log('Channel created:', created),
    );
  }

  listenForForegroundMessages() {
    onMessage(getMessaging(getApp()), async remoteMessage => {
      console.log('Foreground FCM message:', remoteMessage);

      const {title, body} = remoteMessage.notification || {};
      if (title && body) {
        this.showLocalNotification(title, body);
        
      }
    });
  }

  showLocalNotification(title, message) {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title,
      message,
      playSound: true,
      soundName: 'default',
      priority: 'high',
      importance: 'high',
      smallIcon: 'ic_splash',
      largeIcon: 'ic_splash',
    });
  }

  scheduleLocalNotification(title, message, date) {
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id',
      title,
      message,
      date,
      allowWhileIdle: true,
      playSound: true,
      soundName: 'default',
      priority: 'high',
      importance: 'high',
      smallIcon: 'ic_splash',
      largeIcon: 'ic_splash',
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new PushNotificationService();

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {store} from './src/store/redux/store';
import PushNotificationService from './src/utils/notifications/notificationService';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    const init = async () => {
      PushNotificationService.getDeviceToken();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.main}>
        <NavigationContainer>
          <Provider store={store}>
            <AppNavigation />
          </Provider>
        </NavigationContainer>
        <FlashMessage />
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

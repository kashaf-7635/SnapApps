import './gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.ignoreDatePickerWarning = true;

AppRegistry.registerComponent(appName, () => App);

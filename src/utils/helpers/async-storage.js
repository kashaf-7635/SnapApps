import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    const refreshVal = await AsyncStorage.getItem('refreshToken');
    return value != null || refreshVal != null
      ? {token: value, refreshToken: refreshVal}
      : null;
  } catch (e) {
    console.log(e);
  }
};

export const setToken = async ({token, refreshToken}) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (e) {
    console.log(e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
  } catch (e) {
    console.log(e);
  }
};

export const setUid = async value => {
  try {
    await AsyncStorage.setItem('uid', value);
  } catch (e) {
    console.log(e);
  }
};

export const removeUid = async () => {
  try {
    await AsyncStorage.removeItem('uid');
  } catch (e) {
    console.log(e);
  }
};

export const getUid = async () => {
  try {
    const value = await AsyncStorage.getItem('uid');
    return value != null ? value : null;
  } catch (e) {
    console.log(e);
  }
};

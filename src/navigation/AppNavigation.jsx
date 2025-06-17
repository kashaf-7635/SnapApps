import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import UnauthNavigation from './UnauthNavigation';
import MainAppDrawer from './MainAppDrawer';
import {getToken, getUid} from '../utils/helpers/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authenticate} from '../store/redux/authSlice';
import {useRequest} from '../hooks/useRequest';
import {getUser} from '../utils/axios/user';
import {addUser} from '../store/redux/userSlice';

const AppNavigation = () => {
  const dispatch = useDispatch();
  const {isLoading, requestHandler} = useRequest();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      const storedUid = await getUid();

      if (storedToken && storedUid) {
        requestHandler({
          requestFn: () => getUser(storedUid),
          onSuccess: async res => {
            console.log(res);
            dispatch(authenticate(res));
          },
          onError: async err => {
            console.error(err);
          },
        });
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);
  return (
    <>
      {!isAuthenticated ? (
        <UnauthNavigation />
      ) : (
        <MainAppDrawer isLoading={isLoading} />
      )}
    </>
  );
};

export default AppNavigation;

const s = StyleSheet.create({});

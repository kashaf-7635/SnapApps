import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputCmp from '../../components/InputCmp';
import ButtonCmp from '../../components/ButtonCmp';
import Fonts from '../../utils/constants/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {LoginValidationSchema} from '../../utils/helpers/FormValidationSchema';
import LoadingOverlay from '../../components/LoadingCmp';
import {loginUser} from '../../utils/axios/auth';
import {useDispatch} from 'react-redux';
import {authenticate} from '../../store/redux/authSlice';
import {setToken, setUid} from '../../utils/helpers/async-storage';
import {useRequest} from '../../hooks/useRequest';
import {MainApp} from '../../utils/constants/theme';
import { getUser } from '../../utils/axios/user';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading, requestHandler} = useRequest();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = values => {
    requestHandler({
      requestFn: () => loginUser(values.email, values.password),
      successMessage: 'Login Successfully!',
      onSuccess: async res => {
        await setToken({token: res.idToken, refreshToken: res.refreshToken});
        await setUid(res.localId);
        requestHandler({
          requestFn: () => getUser(res.localId),
          onSuccess: async res => {
            dispatch(authenticate(res));
          },
          onError: async err => {
            console.error(err);
          },
        });
      },
      onError: async err => {
        console.error(err);
      },
    });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={s.main}>
      <KeyboardAwareScrollView
        contentContainerStyle={s.scrollContent}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={s.box}>
              <InputCmp
                label="Email Address"
                error={touched.email && errors.email}
                textInputConfig={{
                  inputMode: 'email',
                  onChangeText: handleChange('email'),
                  onBlur: handleBlur('email'),
                  value: values.email,
                }}
              />
              <InputCmp
                label="Password"
                error={touched.password && errors.password}
                iconRight={showPassword ? 'eye-with-line' : 'eye'}
                iconRightClick={() => setShowPassword(!showPassword)}
                textInputConfig={{
                  secureTextEntry: !showPassword,
                  onChangeText: handleChange('password'),
                  onBlur: handleBlur('password'),
                  value: values.password,
                }}
              />

              <ButtonCmp onPress={handleSubmit}>Login</ButtonCmp>

              <View style={s.textContainer}>
                <Text style={s.text}>Don't have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={s.boldText}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;

const s = StyleSheet.create({
  main: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  box: {
    backgroundColor: MainApp.primary800,
    margin: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: MainApp.error100,
    fontSize: 15,
    fontFamily: Fonts.poppins.regular,
  },
  boldText: {
    fontFamily: Fonts.poppins.bold,
    color: MainApp.error100,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

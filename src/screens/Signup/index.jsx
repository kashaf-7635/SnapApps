import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import InputCmp from '../../components/InputCmp';
import ButtonCmp from '../../components/ButtonCmp';
import Fonts from '../../utils/constants/fonts';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignupValidationSchema} from '../../utils/helpers/FormValidationSchema';
import {createUser} from '../../utils/axios/auth';
import LoadingOverlay from '../../components/LoadingCmp';
import {useDispatch} from 'react-redux';
import {authenticate} from '../../store/redux/authSlice';
import {useRequest} from '../../hooks/useRequest';
import {setToken, setUid} from '../../utils/helpers/async-storage';
import {storeUser} from '../../utils/axios/user';
import {MainApp} from '../../utils/constants/theme';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {isLoading, requestHandler} = useRequest();

  const handleSignup = values => {
    requestHandler({
      requestFn: () => createUser(values.email, values.password),
      onSuccess: async res => {
        await setToken({token: res.idToken, refreshToken: res.refreshToken});
        await setUid(res.localId);
        requestHandler({
          requestFn: () =>
            storeUser({
              email: values.email,
              name: values.fullName,
              uid: res.localId,
            }),
          successMessage: 'Signup Successfully!',
        });
        navigation.navigate('Login');
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
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupValidationSchema}
          onSubmit={handleSignup}>
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
                label="Full Name"
                error={touched.fullName && errors.fullName}
                textInputConfig={{
                  onChangeText: handleChange('fullName'),
                  onBlur: handleBlur('fullName'),
                  value: values.fullName,
                }}
              />
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
              <InputCmp
                label="Confirm Password"
                error={touched.confirmPassword && errors.confirmPassword}
                iconRight={showConfirmPassword ? 'eye-with-line' : 'eye'}
                iconRightClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                textInputConfig={{
                  secureTextEntry: !showConfirmPassword,
                  onChangeText: handleChange('confirmPassword'),
                  onBlur: handleBlur('confirmPassword'),
                  value: values.confirmPassword,
                }}
              />

              <ButtonCmp onPress={handleSubmit}>Sign Up</ButtonCmp>

              <View style={s.textContainer}>
                <Text style={s.text}>Already have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={s.boldText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;

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

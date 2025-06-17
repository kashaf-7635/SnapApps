import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonCmp from '../../components/ButtonCmp';
import {MainApp} from '../../utils/constants/theme';
import Fonts from '../../utils/constants/fonts';

const GetStarted = ({navigation}) => {
  return (
    <View style={s.main}>
      <View style={s.imageContainer}>
        <Image source={require('../../assets/story.png')} style={s.image} />
      </View>
      <View style={s.btns}>
        <Text style={s.heading}>WELCOME SNAP APP</Text>
        <ButtonCmp onPress={() => navigation.navigate('Login')}>
          LOGIN
        </ButtonCmp>
        <ButtonCmp
          onPress={() => navigation.navigate('Signup')}
          style={s.btn}
          textStyle={s.btnText}>
          SIGN UP
        </ButtonCmp>
      </View>
    </View>
  );
};

export default GetStarted;

const s = StyleSheet.create({                                                                                                                                                                                                                                                                                                                    
  main: {
    flex: 1,
    padding: 24,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  btns: {
    flex: 1,
  },
  heading: {
    color: MainApp.primary800,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: Fonts.montserrat.bold,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: 'white',
    borderColor: MainApp.primary500,
    borderWidth: 2,
  },
  btnText: {
    color: MainApp.primary500,
  },
});

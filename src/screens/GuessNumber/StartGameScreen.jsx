import React, {useLayoutEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import PrimaryButton from '../../components/GuessNumber/ui/PrimaryButton';
import InstructionText from '../../components/GuessNumber/ui/InstructionText';
import Card from '../../components/GuessNumber/ui/Card';
import Title from '../../components/GuessNumber/ui/Title';
import Icon from '@react-native-vector-icons/entypo';
import {useNavigation} from '@react-navigation/native';
import { GuessNumberTheme } from '../../utils/constants/theme';

const StartGameScreen = ({onPickNumber}) => {
  const navigation = useNavigation();
  const [enteredNumber, setEnteredNumber] = useState('');

  const {width, height} = useWindowDimensions();

  const numberInputHandler = enteredText => {
    setEnteredNumber(enteredText);
  };
  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredNumber);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }

    onPickNumber(choosenNumber);
  };

  const marginTopDistance = height < 380 ? 30 : 50;

  return (
    <>
      <ScrollView style={s.screen}>
        <KeyboardAvoidingView style={s.screen} behavior="position">
          <View style={s.menu}>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{marginLeft: 10}}>
              <Icon name="menu" size={30} color="white" />
            </Pressable>
          </View>
          <View style={[s.rootContainer, {marginTop: marginTopDistance}]}>
            <Title>Guess My Number</Title>
            <Card>
              <InstructionText>Enter a Number</InstructionText>
              <TextInput
                style={s.numberInput}
                maxLength={2}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                value={enteredNumber}
                onChangeText={numberInputHandler}
              />
              <View style={s.btnContainer}>
                <View style={s.btn}>
                  <PrimaryButton onPress={resetInputHandler}>
                    Reset
                  </PrimaryButton>
                </View>
                <View style={s.btn}>
                  <PrimaryButton onPress={confirmInputHandler}>
                    Confirm
                  </PrimaryButton>
                </View>
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default StartGameScreen;

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  menu: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: GuessNumberTheme.accent500,
    borderBottomWidth: 2,
    color: GuessNumberTheme.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
  },
});

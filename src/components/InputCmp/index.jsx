import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import Icon from '@react-native-vector-icons/entypo';
import {MainApp} from '../../utils/constants/theme';

const InputCmp = ({
  label,
  textInputConfig,
  iconRight,
  iconRightClick,
  error,
}) => {
  return (
    <View style={s.container}>
      <Text style={s.label}>{label} :</Text>
      <View style={[s.inputContainer, error && s.inputError]}>
        <TextInput {...textInputConfig} style={s.input} />
        {iconRight && (
          <TouchableOpacity onPress={iconRightClick}>
            <Icon
              name={iconRight}
              color={MainApp.primary800}
              size={20}
              style={s.iconRight}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={s.errorText}>{error}</Text>}
    </View>
  );
};

export default InputCmp;

const s = StyleSheet.create({
  container: {
    padding: 6,
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily: Fonts.montserrat.bold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MainApp.primary100,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: MainApp.error500,
    borderWidth: 2,
    backgroundColor: MainApp.error100,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: MainApp.primary800,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  errorText: {
    color: MainApp.error500,
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.montserrat.bold,
  },
});

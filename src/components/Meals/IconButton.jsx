import {Pressable, StyleSheet, View} from 'react-native';
import Icon from '@react-native-vector-icons/entypo';
import React from 'react';

const IconButton = ({icon, color, onPress}) => {
  return (
    <View style={styles.main}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <Icon name={icon} color={color} size={30} />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  main: {
    height: 30,
    width:30,
    justifyContent:'center',
    alignItems:'center'
  },
  pressed: {
    opacity: 0.7,
  },
});

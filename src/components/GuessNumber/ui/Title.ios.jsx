import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Fonts from '../../../utils/constants/fonts'



const Title = ({ children }) => {
  return (
    <>
      <View>
        <Text style={s.title}>{children}</Text>
      </View>
    </>
  )
}

export default Title

const s = StyleSheet.create({
  title: {
    fontFamily: Fonts.opensans.bold,
    fontSize: 18,
    color: "white",
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    padding: 12,
    maxWidth: '80%',
    width: 300,
  }
})

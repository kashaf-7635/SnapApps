import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Fonts from '../../../utils/constants/fonts'
import { GuessNumberTheme } from '../../../utils/constants/theme'


const NumberContainer = ({ children }) => {
    return (
        <>
            <View style={s.container}>
                <Text style={s.numberText}>{children}</Text>
            </View>
        </>
    )
}

export default NumberContainer

const deviceWidth = Dimensions.get('window').width;

const s = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: GuessNumberTheme.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        color: GuessNumberTheme.accent500,
        fontSize: deviceWidth < 380 ? 12 : 36,
        fontFamily: Fonts.opensans.bold,
    }
})

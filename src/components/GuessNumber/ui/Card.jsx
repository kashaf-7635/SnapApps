import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { GuessNumberTheme } from '../../../utils/constants/theme'


const Card = ({ children }) => {
    return (
        <View style={s.inputContainer}>
            {children}
        </View>
    )
}

export default Card

const deviceWidth = Dimensions.get('window').width;

const s = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        backgroundColor: GuessNumberTheme.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})
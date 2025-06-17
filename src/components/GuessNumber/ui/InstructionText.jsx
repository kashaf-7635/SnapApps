import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Fonts from '../../../utils/constants/fonts'
import { GuessNumberTheme } from '../../../utils/constants/theme'


const InstructionText = ({ children, style }) => {
    return (
        <Text style={[s.instructionText, style]}>{children}</Text>
    )
}

export default InstructionText


const s = StyleSheet.create({
    instructionText: {
        color: GuessNumberTheme.accent500,
        fontSize: 24,
        fontFamily: Fonts.opensans.regular,
    },
})
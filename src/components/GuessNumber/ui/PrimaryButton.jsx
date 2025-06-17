import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { GuessNumberTheme } from '../../../utils/constants/theme'


const PrimaryButton = ({ children, onPress }) => {
    return (
        <>
            <View style={s.outerContainer}>
                <Pressable
                    style = {(pressed)=> pressed? [s.innerContainer,s.pressed] : s.innerContainer}
                    onPress={onPress}
                    android_ripple={{ color: GuessNumberTheme.primary600 }}
                >
                    <Text style={s.buttonText}>{children}</Text>
                </Pressable>
            </View>

        </>
    )
}

export default PrimaryButton

const s = StyleSheet.create({
    outerContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    innerContainer: {
        backgroundColor: GuessNumberTheme.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75,
    },
})

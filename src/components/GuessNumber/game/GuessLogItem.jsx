import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Fonts from '../../../utils/constants/fonts'
import { GuessNumberTheme } from '../../../utils/constants/theme'


const GuessLogItem = ({ roundNumber, guess }) => {
    return (
        <View style={s.listItem}>
            <Text style={s.itemText}>#{roundNumber}</Text>
            <Text style={s.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    )
}

export default GuessLogItem

const s = StyleSheet.create({
    listItem: {
        borderColor: GuessNumberTheme.primary800,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: GuessNumberTheme.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    itemText:{
        fontFamily:Fonts.opensans.regular,
    }
})

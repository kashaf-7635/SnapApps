import React, { useState, useEffect } from 'react'
import { ScrollView, View, useWindowDimensions, StyleSheet, Alert, FlatList } from 'react-native'
import Icon from '@react-native-vector-icons/entypo';
import Title from '../../components/GuessNumber/ui/Title.android';
import NumberContainer from '../../components/GuessNumber/game/NumberContainer';
import PrimaryButton from '../../components/GuessNumber/ui/PrimaryButton';
import Card from '../../components/GuessNumber/ui/Card';
import InstructionText from '../../components/GuessNumber/ui/InstructionText';
import GuessLogItem from '../../components/GuessNumber/game/GuessLogItem';

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(
        1,
        100,
        userNumber
    );
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;
    }, [])

    const nextGuessHandler = (direction) => { // direction => lower, greater
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {

            Alert.alert("Don't lie!", 'You know that this is wrong..',
                [{ text: "Sorry!", style: "cancel" }]
            )
            return;
        }
        if (direction === "lower") {
            maxBoundry = currentGuess;

        } else {
            minBoundry = currentGuess + 1;
        }
        const newRndNum = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
        setCurrentGuess(newRndNum);
        setGuessRounds((prevGuessRounds) => [newRndNum, ...prevGuessRounds])
    }
    const guessRoundListLength = guessRounds.length;

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={s.instructionText}>Higher or Lower?</InstructionText>
                <View style={s.btnContainer}>
                    <View style={s.btn}><PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}><Icon name="minus" size={24} color="white" /></PrimaryButton></View>
                    <View style={s.btn}><PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}><Icon name="plus" size={24} color="white" /></PrimaryButton></View>
                </View>

            </Card>
        </>
    );
    if (width > 500) {
        content = (
            <>
                <View style={{ alignItems: 'center' }}>
                    <InstructionText style={s.instructionText}>Higher or Lower?</InstructionText>
                    <View style={s.btnContainerWide}>
                        <View style={s.btn}><PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}><Icon name="minus" size={24} color="white" /></PrimaryButton></View>
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <View style={s.btn}><PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}><Icon name="plus" size={24} color="white" /></PrimaryButton></View>
                    </View>
                </View>
            </>
        );
    }

    return (
        <>
            <View style={s.screen}>
                <Title>Opponent's Guess</Title>
                <FlatList
                    data={guessRounds}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item, index }) => (
                        <GuessLogItem roundNumber={guessRoundListLength - index} guess={item} />
                    )}
                    ListHeaderComponent={
                        <>
                            {content}
                        </>
                    }

                />
            </View>
        </>
    )
}

export default GameScreen

const s = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12
    },
    btnContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }

})

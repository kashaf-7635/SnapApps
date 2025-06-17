import React from 'react'
import { ScrollView, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import PrimaryButton from '../../components/GuessNumber/ui/PrimaryButton';
import Title from '../../components/GuessNumber/ui/Title.android';
import Fonts from '../../utils/constants/fonts';
import { GuessNumberTheme } from '../../utils/constants/theme';


const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
    const { width, height } = useWindowDimensions();

    let imageSize = 300;
    if (width < 380) {
        imageSize = 150
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }
    return (
        <ScrollView>

       
        <View style={s.rootContainer}>
            <Title>GAME OVER!</Title>
            <View style={[s.imageContainer, imageStyle]}>
                <Image
                    style={s.image}
                    source={require("../../assets/GuessNumber/success.png")}

                />
            </View>

            <Text style={s.summaryText}>
                You Phone needed
                <Text style={s.highlight}> {roundsNumber} </Text>
                rounds to guess the number
                <Text style={s.highlight}> {userNumber}</Text>.
            </Text>

            <PrimaryButton onPress={onStartNewGame}>Start New Game!</PrimaryButton>

        </View>
        </ScrollView>
    )
}

export default GameOverScreen

// const deviceWidth = Dimensions.get('window').width;

const s = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // borderRadius:  deviceWidth < 380 ? 75: 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: GuessNumberTheme.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        height: '100%',
        width: '100%'
    },
    summaryText: {
        fontFamily: Fonts.opensans.regular,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: Fonts.opensans.bold,
        color: GuessNumberTheme.primary500,
    }
})

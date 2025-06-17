import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartGameScreen from './StartGameScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import { GuessNumberTheme } from '../../utils/constants/theme';


const GuessNumber = ({}) => {
    const [userNumber, setUserNumber] = useState(null);
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);
  
    const pickedNumberHandler = (pickedNumber) => {
      setUserNumber(pickedNumber);
      setGameIsOver(false);
    }
  
    const gameOverHandler = (numberOfRounds) => {
      setGameIsOver(true);
      setGuessRounds(numberOfRounds);
    }
  
    const startNewGameHandler = () => {
      setUserNumber(null);
      setGuessRounds(0);
    }
  
    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
    if (userNumber) {
      screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    }
  
    if (gameIsOver && userNumber) {
      screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
    }
  return (
    <>
     <LinearGradient
        colors={[GuessNumberTheme.primary700, GuessNumberTheme.accent500]}
        style={styles.rootScreen}>
        <ImageBackground
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
          source={require('../../assets/GuessNumber/background.png')}>
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>

      </LinearGradient>
    </>
   
  )
}

export default GuessNumber

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
      },
      backgroundImage: {
        opacity: 0.15,
      }
})
import {ImageBackground, StyleSheet, SafeAreaView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from 'expo-font';

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [neededRounds, setNeededRounds] = useState(0);

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
            });
        };

        const prepareApp = async () => {
            try {
                await Promise.all([loadFonts()]);
            } catch (error) {
                console.error(error);
            } finally {
                setAppIsReady(true);
            }
        };

        prepareApp();
    }, []);

    if (!appIsReady) {
        return null;
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function incrementRoundsHandler() {
        setNeededRounds(neededRounds + 1);
    }

    function gameOverHandler() {
        setGameIsOver(true);
    }

    function startNewGameHandler() {
        setGameIsOver(false);
        setUserNumber(null);
        setNeededRounds(0);
    }

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}
                             onIncrementRounds={incrementRoundsHandler}/>;
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen rounds={neededRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler}/>;
    }


    return (
        <LinearGradient style={styles.rootScreen} colors={['#4e0329', '#ddb52f']}>
            <ImageBackground
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
                source={require('./assets/images/background.png')}>
                <SafeAreaView style={styles.rootScreen}>
                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rootScreen: {
        flex: 1
    },
    backgroundImage: {
        opacity: 0.15
    }
});

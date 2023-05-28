import {ImageBackground, StyleSheet, SafeAreaView} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);

    const [fontsLoaded] = useFonts({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }
    function gameOverHandler() {
        setGameIsOver(true);
    }

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
    }

    if(gameIsOver && userNumber) {
        screen = <GameOverScreen/>;
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

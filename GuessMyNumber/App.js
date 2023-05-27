import {ImageBackground, StatusBar, StyleSheet, View, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);

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

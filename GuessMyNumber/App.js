import {ImageBackground, StatusBar, StyleSheet, View, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import GameScreen from "./screens/GameScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber)
    }

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>

    if (userNumber) {
        console.log("Switch to GameScreen");
        screen = <GameScreen/>;
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

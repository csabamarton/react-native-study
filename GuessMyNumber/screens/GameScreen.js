import React, {useEffect, useState} from "react";
import {View, StyleSheet, Alert, Text, FlatList} from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/ui/GuessLogItem";


function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver, onIncrementRounds}) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);



    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) { // 'lower', 'greater'
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong..', [
                {text: 'Sorry!', style: 'cancel'}
            ])
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess - 1;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        onIncrementRounds();
        setGuessRounds(preGuessRounds => [newRndNumber, ...preGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => { return (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}
                            key={itemData.item.id}
                        />
                    )
                }} keyExtractor={(item) => item}
                          alwaysBounceVertical={false}
                />
            </View>
        </View>

    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})



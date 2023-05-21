import {Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [goals, setGoals] = useState([]);

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText)
    };

    function addGoalHandler() {
        setGoals(currentGoals => [
            ...currentGoals,
            { text: enteredGoalText, key: Math.random().toString() }
        ]);
        setEnteredGoalText('');
    };

    return (
        <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder='My goals' onChangeText={goalInputHandler}/>
                <Button title='Add Goal' onPress={addGoalHandler}/>
            </View>
            <View style={styles.goalsContainer}>
                <FlatList data={goals} renderItem={(goalItem) => { return (
                    <View style={styles.goalItem}>
                        <Text style={styles.goalText}>{goalItem.item.text}</Text>
                    </View>)
                }}
                keyExtractor={(item, index) => { return item.key }} alwaysBounceVertical={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        flex: 1
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8
    },
    goalsContainer: {
        flex: 5
    },
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
        color: 'white'
    },
    goalText: {
      color: 'white'
    }
});

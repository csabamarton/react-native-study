import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import {useState} from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [goals, setGoals] = useState([]);

    function addGoalHandler(enteredGoalText) {
        setGoals(currentGoals => [
            ...currentGoals,
            { text: enteredGoalText, id: Math.random().toString() }
        ]);
    };

    function deleteGoalHandler(id) {
        console.log('DELETE')
        setGoals((currentGoals) => {
            return currentGoals.filter((goal) => goal.id !== id)
        })
    }

    return (
        <View style={styles.appContainer}>
            <GoalInput
                onAddGoal={addGoalHandler}
            />
            <View style={styles.goalsContainer}>
                <FlatList data={goals} renderItem={(goalItem) => { return (
                    <GoalItem
                        text={goalItem.item.text}
                        id={goalItem.item.id}
                        onDeleteItem={deleteGoalHandler}/>
                    )
                }}
                keyExtractor={(item, index) => { return item.id }} alwaysBounceVertical={false}
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
    goalsContainer: {
        flex: 5
    }
});

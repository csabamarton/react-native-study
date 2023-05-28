import {Text, View, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

function NumberContainer({children}) {
    return (
    <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
    )
}

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.accent500,
        borderWidth: 5,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.accent500,
        fontSize: 36,
        fontFamily: 'open-sans-bold'    }
})

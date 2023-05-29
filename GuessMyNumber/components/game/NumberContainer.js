import {Text, View, StyleSheet, Dimensions} from "react-native";
import Colors from "../../constants/Colors";

function NumberContainer({children}) {
    return (
    <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
    )
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.accent500,
        borderWidth: 5,
        padding: deviceWidth > 380 ? 24 : 12,
        borderRadius: 8,
        margin: deviceWidth > 380 ? 24 : 12,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidth > 380 ? 36 : 28,
        fontFamily: 'open-sans-bold'    }
})

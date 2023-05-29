import {Dimensions, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";
function Card( {children: children}) {
    return (
        <View style={styles.card}>{children}</View>
    )
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: deviceWidth > 380 ? 36 : 18,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    }
})

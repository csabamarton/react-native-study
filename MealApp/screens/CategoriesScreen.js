import {FlatList, Text} from "react-native";
import {CATEGORIES} from "../data/dummy-data";

function CategoriesScreen() {
    return (
        <FlatList data={CATEGORIES} keyExtractor={item => item.id} renderItem={item => {
            <Text></Text>
        }}/>
    )
}

export default CategoriesScreen;

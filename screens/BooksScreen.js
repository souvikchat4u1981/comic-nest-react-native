import { Text, View } from "react-native";
import BaseScreen from "./BaseScreen";

function BooksScreen() {
    return (
        <BaseScreen showSearchBox={false}>
            <Text>BooksScreen</Text>
        </BaseScreen>
    );
}

export default BooksScreen;

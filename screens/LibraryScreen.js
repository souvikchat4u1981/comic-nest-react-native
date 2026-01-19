import { Text, View } from "react-native";
import BaseScreen from "./BaseScreen";

function LibraryScreen() {
    return (
        <BaseScreen showSearchBox={false}>
            <View>
                <Text>LibraryScreen</Text>
            </View>
        </BaseScreen>
    );
}

export default LibraryScreen;
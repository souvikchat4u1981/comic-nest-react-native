import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";

function BackButton() {
    const navigation = useNavigation();
    function backPressed() {
        navigation.goBack();
    }
    return (
        <Pressable onPress={backPressed} style={({ pressed }) => [styles.button, pressed && styles.iconPressed]}>
            <View style={styles.iconContainer}>
                <Ionicons name={"chevron-back-outline"} size={24} color={Colors.booktitle} />
            </View>
        </Pressable>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconPressed: {
        opacity: 0.7,
    }
});
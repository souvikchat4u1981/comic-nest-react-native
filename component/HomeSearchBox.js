import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import Colors from "../constants/colors";

function HomeSearchBox() {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <View style={styles.container}>
            {/* Search Icon */}

            <Ionicons name="search" color={Colors.searchBoxIconColor} size={20} style={styles.icon} />


            {/* Text Input */}
            <TextInput
                style={styles.textInput}
                placeholder="Search..."
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
        </View>
    )
}

export default HomeSearchBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Aligns children horizontally
        alignItems: 'center', // Centers children vertically
        borderWidth: 1,
        borderColor: Colors.textBoxBorderColor,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 12,
        height: 40,
    },
    iconContainer: {

        color: Colors.searchBoxIconColor,
    },
    icon: {
        marginRight: 10, // Adds space between the icon and the text input
    },
    textInput: {
        flex: 1, // Allows the TextInput to take up the remaining space
        height: '100%',
    },
})
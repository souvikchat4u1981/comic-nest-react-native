import { View, StyleSheet, FlatList } from "react-native";
import BaseScreen from "./BaseScreen";
import ContinueReading from "../component/ContinueReading";
import BrowseByCategories from "../component/BrowseByCategories";

const screenComponents = [
    { id: 'continue_reading', Component: ContinueReading },
    { id: 'browse_by_categories', Component: BrowseByCategories },
];

function Home() {
    const renderItem = ({ item }) => {
        const { Component } = item;
        return (
            <View style={styles.componentWrapper}>
                <Component />
            </View>
        );
    };

    return (
        <BaseScreen showSearchBox={true} useScrollView={false}>
            <FlatList
                data={screenComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </BaseScreen>
    );
}

export default Home;

const styles = StyleSheet.create({
    listContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    componentWrapper: {
        width: '100%',
        alignItems: 'center',
    }
});

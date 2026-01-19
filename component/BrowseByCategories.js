import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BOOKS } from "../DummyData/dummydata";
import Colors from "../constants/colors";
import { getBookImage } from "../utils/images";

const getIconForCategory = (category) => {
    const iconMap = {
        'Genre 1': 'sword', // Action/Adventure
        'Genre 2': 'space-invaders', // Sci-Fi
        'Genre 3': 'ghost', // Horror
        'Genre 4': 'magic-staff', // Fantasy
        'Genre 5': 'robot', // Mecha/Sci-Fi
    };
    return iconMap[category] || 'book-open-variant'; // Default icon
};


function BrowseByCategories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    useEffect(() => {
        const uniqueCategories = [...new Set(BOOKS.map(book => book.genere))];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
            setSelectedCategory(uniqueCategories[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const booksForCategory = BOOKS.filter(book => book.genere === selectedCategory);
            setFilteredBooks(booksForCategory);
        }
    }, [selectedCategory]);

    const bookWidth = 120;
    const bookMargin = 10;
    const listHorizontalPadding = 15;
    const availableWidth = width * 0.9 - (listHorizontalPadding * 2);
    const itemTotalWidth = bookWidth + (bookMargin * 2);
    const numColumns = Math.max(1, Math.floor(availableWidth / itemTotalWidth));

    function renderCategoryItem({ item }) {
        const isSelected = item === selectedCategory;
        const iconName = getIconForCategory(item);
        const iconColor = isSelected ? Colors.headingColor : Colors.primaryColor;

        return (
            <TouchableOpacity
                style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
                onPress={() => setSelectedCategory(item)}
            >
                <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
                <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>{item}</Text>
            </TouchableOpacity>
        );
    }

    function renderBookItem({ item }) {
        function bookPressed() {
            navigation.navigate("bookdetails", { bookid: item.bookid });
        }
        return (
            <Pressable style={({ pressed }) => [pressed ? styles.bookPressable : null]} onPress={bookPressed}>
                <View style={styles.bookView}>
                    <Image source={getBookImage(item.bookimage)} style={styles.bookImage} />
                    <Text style={styles.booktitle} numberOfLines={2}>{item.bookname}</Text>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>Browse By Categories</Text>
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.categoriesListContainer}>
                    <FlatList
                        horizontal
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryListContent}
                    />
                </View>
                <View style={styles.booksListContainer}>
                    <FlatList
                        data={filteredBooks}
                        renderItem={renderBookItem}
                        keyExtractor={(item) => item.bookid}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.bookListContent}
                        numColumns={numColumns}
                        key={numColumns}
                    />
                </View>
            </View>
        </View>
    );
}

export default BrowseByCategories;

const styles = StyleSheet.create({
    outerContainer: {
        marginVertical: 10,
        width: '90%', // 90% width
        alignSelf: 'center', // Center horizontally
    },
    titleContainer: {
        paddingHorizontal: 0, // Removed padding as outerContainer is now 90% width and centered
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.booktitle,
        marginBottom: 10,
        textAlign: 'left', // Center the title text within the 90% width container
    },
    contentWrapper: {
        borderRadius: 10,
        elevation: 5,
        backgroundColor: Colors.background700,
        paddingTop: 10, // Top padding for content inside wrapper
        marginTop: 10, // Space between title and content wrapper
        paddingBottom: 10,
    },
    categoriesListContainer: {
        height: 40,
        marginBottom: 10,
    },
    categoryListContent: {
        paddingHorizontal: 15, // Padding for categories FlatList
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4, // Made thinner
        paddingHorizontal: 12, // Made thinner
        marginHorizontal: 5,
        borderRadius: 40,
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
    },
    categoryButtonSelected: {
        backgroundColor: Colors.primaryColor,
    },
    categoryText: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    categoryTextSelected: {
        color: Colors.headingColor
    },
    booksListContainer: {
        // height: 250,
        alignItems: 'center',
    },
    bookListContent: {
        paddingHorizontal: 15, // Padding for books FlatList
    },
    bookView: {
        width: 140,
        height: 250,
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    bookImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    booktitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.booktitle,
        marginTop: 5,
    },
    bookPressable: {
        opacity: 0.7,
    }
});
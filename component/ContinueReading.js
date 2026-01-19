import { FlatList, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import { BOOKS, PURCHASED_BOOKS } from "../DummyData/dummydata";
import { getBookImage, getThumbnailImage } from "../utils/images";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

function ContinueReading() {
    const purchasedBooks = PURCHASED_BOOKS;
    const books = BOOKS;
    const navigation = useNavigation();

    function renderItem({ item: purchasedBook }) {
        const book = books.find(b => b.bookid === purchasedBook.bookid);

        if (!book) {
            console.log("Book not found", purchasedBook.bookid)
            return null;
        }

        const readPages = parseInt(purchasedBook.readpagecount, 10);
        const totalPages = parseInt(book.pageCount, 10);
        const percentage = totalPages > 0 ? (readPages / totalPages) * 100 : 0;

        function bookPressed() {

            navigation.navigate("reading", { bookid: book.bookid, ispurchased: true, readpagecount: readPages });
        }

        return (
            <Pressable style={({ pressed }) => [pressed ? styles.bookPressable : null]} onPress={bookPressed}>
                <View style={styles.bookView}>
                    <View style={styles.imageContainer}>
                        <Image source={getThumbnailImage(book.thumbnailImage)} style={styles.bookImage} />
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBar, { width: `${percentage}%` }]} />
                            <Text style={styles.percentageText}>{`${Math.round(percentage)}%`}</Text>
                        </View>
                    </View>
                    <Text style={styles.booktitle}>{book.bookname}</Text>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Continue Reading</Text>
            </View>
            <View style={styles.booksContainer}>
                <FlatList
                    horizontal={true}
                    data={purchasedBooks}
                    keyExtractor={(item) => item.purchaseid}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContentContainer}
                />
            </View>
        </View>
    );
}

export default ContinueReading;

const styles = StyleSheet.create({
    outerContainer: {
        height: 270,
        marginVertical: 10,
        width: '90%', // 90% width
        alignSelf: 'center', // Center horizontally
    },
    titleContainer: {
        paddingHorizontal: 0, // Removed padding as outerContainer is now 90% width and centered
    },
    booksContainer: {
        flex: 1, // Takes remaining height
        borderRadius: 10,
        elevation: 5,
        backgroundColor: Colors.background800,
        padding: 10, // Padding here will apply to the content inside the FlatList
        marginTop: 10, // Space between title and books
    },
    listContentContainer: {
        // No horizontal padding here, booksContainer handles it
    },
    bookView: {
        width: 120,
        height: 200,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: Colors.background,
    },
    bookImage: {
        width: '100%',
        height: '100%',
    },
    progressBarBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primaryColor,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    percentageText: {
        color: Colors.progressbarTextColor,
        fontSize: 10,
        fontWeight: 'bold',
        zIndex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 0,
        color: Colors.headingColor,
        textAlign: 'left', // Center the title text within the 90% width container
    },
    booktitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: Colors.booktitle,
    },
    bookPressable: {
        opacity: 0.7,
    }
});




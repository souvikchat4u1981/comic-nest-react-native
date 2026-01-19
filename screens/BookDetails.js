import { Image, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BaseScreen from "./BaseScreen";
import Colors from "../constants/colors";
import BackButton from "../component/BackButton";
import { getBookImage } from "../utils/images";
import variables from "../constants/variables";
import { BOOKS } from "../DummyData/dummydata";

function BookDetails({ route }) {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const bookid = route.params.bookid;
    const book = BOOKS.find(book => book.bookid === bookid);
    const isWideScreen = width > 600;

    function openPreview() {
        navigation.navigate('reading', { bookid: book.bookid, ispurchased: false });
    }

    return (
        <BaseScreen showSearchBox={false}>
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <BackButton />
                </View>
                <View style={[styles.contentContainer, isWideScreen && styles.contentContainerWide]}>
                    <TouchableOpacity onPress={openPreview} style={[styles.imageContainer, isWideScreen && styles.imageContainerWide]}>
                        <Image source={getBookImage(book.bookimage)} style={styles.image} />
                    </TouchableOpacity>
                    <View style={[styles.detailsContainer, isWideScreen && styles.detailsContainerWide]}>
                        <Text style={[styles.title, isWideScreen && styles.titleWide]}>{book.bookname}</Text>
                        <Text style={[styles.author, isWideScreen && styles.authorWide]}>by {book.author}</Text>
                        <Text style={[styles.description, isWideScreen && styles.descriptionWide]}>{book.bookdescription}</Text>
                    </View>
                </View>
                <View style={[styles.buttonContainer, isWideScreen && styles.buttonContainerWide]}>
                    <TouchableOpacity style={[styles.button, isWideScreen && styles.buttonWide]}>
                        <Text style={styles.buttonText}>Purchase</Text>
                        <Text style={styles.priceText}>{variables.moneySymbol}{book.purchasePrice}</Text>
                    </TouchableOpacity>
                    {book.isRentAvailable && (
                        <TouchableOpacity style={[styles.button, styles.rentButton, isWideScreen && styles.buttonWide]}>
                            <Text style={styles.buttonText}>Rent</Text>
                            <Text style={styles.priceText}>{variables.moneySymbol}{book.rentPrice}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </BaseScreen>
    );
}

export default BookDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 40,
        left: 30,
        zIndex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
    contentContainerWide: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    imageContainerWide: {
        flex: 1.2,
        marginVertical: 0,
        paddingTop: 40,
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    detailsContainer: {
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
    },
    detailsContainerWide: {
        flex: 1.8,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginVertical: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.booktitle,
        textAlign: 'center',
    },
    titleWide: {
        textAlign: 'left',
    },
    author: {
        fontSize: 18,
        color: '#666',
        marginVertical: 5,
        textAlign: 'center',
    },
    authorWide: {
        textAlign: 'left',
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
    },
    descriptionWide: {
        textAlign: 'left',
    },
    buttonContainer: {
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
    },
    buttonContainerWide: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: Colors.primaryColor,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    buttonWide: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 0,
    },
    rentButton: {
        backgroundColor: Colors.background800,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    }
});

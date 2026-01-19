import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';
import { ImageBackground, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeSearchBox from '../component/HomeSearchBox';

function BaseScreen({ children, showSearchBox = true, useScrollView = true }) {
    return (
        <LinearGradient colors={[Colors.background900, Colors.background]} style={styles.container}>
            <ImageBackground
                source={require('../assets/images/background.png')}
                resizeMode='cover'
                style={styles.container}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.safeArea}>
                    {showSearchBox && <HomeSearchBox />}
                    {useScrollView ? (
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.mainView}>
                                {children}
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.container}>
                            {children}
                        </View>
                    )}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

export default BaseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    mainView: {
        width: '100%',
        alignItems: 'center',
    },
});
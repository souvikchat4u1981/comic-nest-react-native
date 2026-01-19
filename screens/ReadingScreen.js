import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native';

import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import BaseScreen from './BaseScreen';
import BackButton from '../component/BackButton';

/* ---------------- SAMPLE PAGES ---------------- */

const PAGES = [
    require('../assets/books/sample/sample_Page1.png'),
    require('../assets/books/sample/sample_Page2.png'),
    require('../assets/books/sample/sample_Page3.png'),
    require('../assets/books/sample/sample_Page4.png'),
    require('../assets/books/sample/sample_Page5.png'),
    require('../assets/books/sample/sample_Page6.png'),
    require('../assets/books/sample/sample_Page7.png'),
    require('../assets/books/sample/sample_Page8.png'),
    require('../assets/books/sample/sample_Page9.png'),
    require('../assets/books/sample/sample_Page10.png'),
    require('../assets/books/sample/sample_Page11.png'),
    require('../assets/books/sample/sample_Page12.png'),
    require('../assets/books/sample/sample_Page13.png'),
    require('../assets/books/sample/sample_Page14.png'),
    require('../assets/books/sample/sample_Page15.png'),
    require('../assets/books/sample/sample_Page16.png'),
    require('../assets/books/sample/sample_Page17.png'),
    require('../assets/books/sample/sample_Page18.png'),
    require('../assets/books/sample/sample_Page19.png'),
    require('../assets/books/sample/sample_Page20.png'),
];

const AnimatedImage = Animated.createAnimatedComponent(Image);

/* ---------------- SCREEN ---------------- */

export default function ReadingScreen({ route }) {
    const { width, height } = useWindowDimensions();

    const { ispurchased = true, readpagecount } = route.params;

    const availablePages = ispurchased === false ? PAGES.slice(0, 5) : PAGES;

    let initialPage = 0;
    if (readpagecount && Number(readpagecount) > 0) {
        const page = Number(readpagecount) - 1;
        if (page < availablePages.length) {
            initialPage = page;
        } else if (availablePages.length > 0) {
            initialPage = availablePages.length - 1;
        }
    }

    const [pageIndex, setPageIndex] = useState(initialPage);
    const flatListRef = useRef(null);

    /* ---------- Shared Values ---------- */
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panOffset = useSharedValue({ x: 0, y: 0 });

    /* ---------- Gestures ---------- */

    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            'worklet';
            savedScale.value = scale.value;
        })
        .onUpdate((e) => {
            'worklet';
            scale.value = Math.max(1, savedScale.value * e.scale);
        })
        .onEnd(() => {
            'worklet';
            if (scale.value < 1) {
                scale.value = withTiming(1);
            }
        });

    const panGesture = Gesture.Pan()
        .onStart(() => {
            'worklet';
            panOffset.value = { x: translateX.value, y: translateY.value };
        })
        .onUpdate((e) => {
            'worklet';
            if (scale.value > 1) {
                translateX.value = panOffset.value.x + e.translationX;
                translateY.value = panOffset.value.y + e.translationY;
            }
        });

    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            'worklet';
            if (scale.value > 1) {
                scale.value = withTiming(1);
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
                panOffset.value = { x: 0, y: 0 };
            } else {
                scale.value = withTiming(2);
            }
        });

    const composedGesture = Gesture.Simultaneous(
        pinchGesture,
        panGesture,
        doubleTapGesture
    );

    /* ---------- Animated Style ---------- */

    const imageStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    /* ---------- Page Change ---------- */

    const resetZoomAndPan = () => {
        'worklet';
        scale.value = 1;
        savedScale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
        panOffset.value = { x: 0, y: 0 };
    };

    const onPageChangeBySwipe = (e) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index !== pageIndex) {
            setPageIndex(index);
            resetZoomAndPan();
        }
    };

    const goToPage = (index) => {
        if (index >= 0 && index < availablePages.length && index !== pageIndex) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
            setPageIndex(index);
            resetZoomAndPan();
        }
    };

    const getItemLayout = (_, index) => ({
        length: width,
        offset: width * index,
        index,
    });

    return (
        <BaseScreen showSearchBox={false} useScrollView={false}>
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.backButton}>
                    <BackButton />
                </View>

                {/* ---------- FLATLIST (ONLY FOR SWIPE) ---------- */}
                <FlatList
                    ref={flatListRef}
                    data={availablePages}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onPageChangeBySwipe}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={() => <View style={{ width, height }} />}
                    initialScrollIndex={initialPage}
                    getItemLayout={getItemLayout}
                    onScrollToIndexFailed={() => {}}
                />

                {/* ---------- IMAGE LAYER (ZOOM + PAN) ---------- */}
                <GestureDetector gesture={composedGesture}>
                    <AnimatedImage
                        source={availablePages[pageIndex]}
                        style={[
                            {
                                position: 'absolute',
                                width,
                                height,
                            },
                            imageStyle,
                        ]}
                        resizeMode="contain"
                    />
                </GestureDetector>

                {/* ---------- NAVIGATION BUTTONS ---------- */}
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => goToPage(pageIndex - 1)}
                    />
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => goToPage(pageIndex + 1)}
                    />
                </View>
            </GestureHandlerRootView>
        </BaseScreen>
    );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    navContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 5,
    },
    navButton: {
        width: '30%',
        height: '100%',
    },
});
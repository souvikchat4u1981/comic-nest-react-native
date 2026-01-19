const imageMap = {
    cover1: require('../assets/images/cover1.png'),
    cover2: require('../assets/images/cover2.png'),
    cover3: require('../assets/images/cover3.png'),
    cover4: require('../assets/images/cover4.png'),
    cover5: require('../assets/images/cover5.png'),
    cover6: require('../assets/images/cover6.png'),
    cover7: require('../assets/images/cover7.png'),
    cover8: require('../assets/images/cover8.png'),
    cover9: require('../assets/images/cover9.png'),
    cover10: require('../assets/images/cover10.png'),
};

export const getBookImage = (bookImageName) => {
    return imageMap[bookImageName];
};

export const getThumbnailImage = (thumbnailImageName) => {
    return imageMap[thumbnailImageName];
};

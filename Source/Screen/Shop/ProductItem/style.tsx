import { Constants } from "lybrid-common";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: Constants.MeasureSize(15),
        marginBottom: Constants.MeasureSize(15),
        borderRadius: Constants.MeasureSize(10),
        backgroundColor: '#F5F5F5',
    },
    wrapImage: {
        width: "100%",
        aspectRatio: 382 / 203,
        borderRadius: Constants.MeasureSize(10),
        backgroundColor: 'white',
    },
    image: {
        width: "100%",
        aspectRatio: 382 / 203,
        borderRadius: Constants.MeasureSize(10),
        // backgroundColor: 'white',
    },
    icon: {
        width: Constants.MeasureSize(15),
        height: Constants.MeasureSize(15),
        resizeMode: 'contain',
    },
    brandWrap: {
        position: 'absolute',
        top: Constants.MeasureSize(10),
        left: Constants.MeasureSize(10),
        backgroundColor: '#F1F1F1',
        borderRadius: Constants.MeasureSize(4),
        paddingVertical: Constants.MeasureSize(4),
        paddingHorizontal: Constants.MeasureSize(6),
    },
    brand: {
        fontSize: Constants.FontSize.tiny,
        color: '#0A3040',
    },
    content: {
        flex: 1,
        padding: Constants.MeasureSize(6)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Constants.MeasureSize(2)
    },
    name: {
        fontSize: Constants.FontSize.medium,
        // height: Constants.MeasureSize(36),
        fontWeight: 'bold',
        color: '#000000',
    },
    rate: {
        fontSize: Constants.FontSize.tiny,
        fontWeight: '400',
        color: '#000000',
        marginLeft: Constants.MeasureSize(4),
        marginRight: Constants.MeasureSize(4),
    },
    price: {
        fontSize: Constants.FontSize.tiny,
        fontWeight: '400',
        color: '#000000',
        marginLeft: Constants.MeasureSize(4),
    },
    priceSign: {
        fontSize: Constants.FontSize.tiny,
        fontWeight: '400',
        color: '#000000',
    },
    tag: {
        fontSize: Constants.FontSize.tiny,
        color: '#515151',
    },
    categoryAndProductType: {
        fontSize: Constants.FontSize.tiny,
        fontWeight: '400',
        color: '#000000',
        marginLeft: Constants.MeasureSize(4),
    },
    wrapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Constants.MeasureSize(6)
    },
    viewBrandButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#BBBBBB',
        marginRight: Constants.MeasureSize(6),
    },
    viewBrandLabel: {
        fontSize: Constants.FontSize.tiny,
        letterSpacing: 0,
        color: '#0A3040',
    },
    orderNowButton: {
        backgroundColor: '#1C0056'
    },
    orderNowLabel: {
        fontSize: Constants.FontSize.tiny,
        letterSpacing: 0,
        fontWeight: 'bold',
        color: 'white',
    },
    likeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: Constants.MeasureSize(10),
    },
    likeButtonIcon: {
    },
})
import { Colors, Constants, Styles } from 'lybrid-common';
import Style from 'lybrid-common/Style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    safeView: {
        width: "100%",
        height: 'auto',
    },
    scrollContainer: {
        paddingBottom: Constants.MeasureSize(100),
    },
    container: {
        paddingHorizontal: Constants.MeasureSize(15),
        paddingVertical: Constants.MeasureSize(10),
    },
    recommendContent: {
        height: Constants.MeasureSize(330),
        marginTop: Constants.MeasureSize(10),
    },
    recommendContentContainer: {
        paddingRight: Constants.MeasureSize(15),
    },
    recommendItem: {
        flex: undefined,
        height: Constants.MeasureSize(320),
        width: Constants.MeasureSize(240),
        marginRight: Constants.MeasureSize(0),
        marginBottom: Constants.MeasureSize(15),
        borderRadius: Constants.MeasureSize(10),
    },
    avatarWrap: {
        marginTop: Constants.MeasureSize(5),
        width: Constants.MeasureSize(50),
        height: Constants.MeasureSize(50),
        borderRadius: Constants.MeasureSize(25),
        backgroundColor: 'white',
        ...Styles.centerContent,
        ...Styles.shadowSmall,
    },
    avatar: {
        width: Constants.MeasureSize(50),
        height: Constants.MeasureSize(50),
        borderRadius: Constants.MeasureSize(25),
        resizeMode: 'contain',
        // alignContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red'
    },

    hello: {
        paddingLeft: Constants.MeasureSize(10),
        fontSize: Constants.FontSize.tiny,
        color: '#515151',
    },

    account: {
        marginTop: Constants.MeasureSize(5),
        paddingLeft: Constants.MeasureSize(10),
        fontSize: Constants.FontSize.medium,
        color: '#0A3040',
        ...Style.fontBold
    },

    recommendLabel: {
        marginTop: Constants.MeasureSize(5),
        paddingHorizontal: Constants.MeasureSize(15),
        fontSize: Constants.FontSize.medium,
        color: '#000000',
        ...Style.fontBold
    },
});
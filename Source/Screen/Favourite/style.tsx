import { Colors, Constants, Styles } from 'lybrid-common';
import Style from 'lybrid-common/Style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: Constants.MeasureSize(15),
        paddingVertical: Constants.MeasureSize(10),
        backgroundColor: 'white',
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

    title: {
        flex: 1,
        marginTop: Constants.MeasureSize(15),
        fontSize: Constants.FontSize.big,
        justifyContentrrr: 'center',
        color: '#0A3040',
        ...Style.fontBold
    },

    total: {
        paddingLeft: Constants.MeasureSize(20),
        fontSize: Constants.FontSize.tiny,
        color: '#515151',
    },

    list: {
        height: 1,
    },

    listContainer: {
        paddingTop: Constants.MeasureSize(15),
        // paddingTop: Constants.MeasureSize(50),
        paddingBottom: 120,
        flexGrow: 1,
    },
});
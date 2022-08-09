import { Colors, Constants, Styles } from 'lybrid-common';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logoWrap: {
        marginBottom: Constants.MeasureSize(20),
        width: Constants.MeasureSize(100),
        height: Constants.MeasureSize(100),
        borderRadius: Constants.MeasureSize(100),
        backgroundColor: 'white',
        alignSelf: 'center',
        ...Styles.centerContent,
        ...Styles.shadowSmall,
    },
    logo: {
        width: Constants.MeasureSize(80),
        height: Constants.MeasureSize(80),
        resizeMode: 'contain',
        // alignContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red'
    },
    input: {
        flex: 1,
        height: Constants.MeasureSize(40),
        backgroundColor: 'white',
        padding: Constants.MeasureSize(5),
        borderRadius: Constants.MeasureSize(5),
        borderWidth: 0.5,
        borderColor: Colors.Border
    },
    wrapButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Constants.MeasureSize(15),
    },
    title: {
        marginTop: Constants.MeasureSize(20),
        width: "100%",
        padding: Constants.MeasureSize(5),
        borderRadius: Constants.MeasureSize(5),
        textAlign: 'center',
        fontSize: Constants.FontSize.small
    },
    button: {
        marginTop: Constants.MeasureSize(30),
        width: Constants.MeasureSize(200),
        height: Constants.MeasureSize(30),
        backgroundColor: 'white',
        padding: Constants.MeasureSize(5),
        borderRadius: Constants.MeasureSize(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 13
    },
    box: {
        height: Constants.MeasureSize(50),
    }
});